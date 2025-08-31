const db = require('../db');

// This function will get the user's profile using the ID from the token
const getUserProfile = async (req, res) => {
  try {
    // req.user.id is attached by our authMiddleware
    const userId = req.user.id;
    
    // Query the database for the user's info, excluding the password hash
    const userResult = await db.query(
      'SELECT id, first_name, last_name, email, created_at FROM Users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
};