const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Hash the password before storing it
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Save the new user to the database
    const sql = `
      INSERT INTO Users (first_name, last_name, email, password_hash, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, email, first_name, last_name, created_at;
    `;
    const newUserResult = await db.query(sql, [first_name, last_name, email, password_hash]);
    const newUser = newUserResult.rows[0];

    res.status(201).json(newUser);

  } catch (error) {
    console.error("Error registering user:", error);
    if (error.code === '23505') { // Unique constraint violation for email
      return res.status(409).json({ error: 'This email address is already in use.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Find the user by their email
    const userResult = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = userResult.rows[0];

    // Compare the submitted password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If passwords match, generate a JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};