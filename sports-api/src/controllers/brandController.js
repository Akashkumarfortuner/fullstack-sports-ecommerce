const db = require('../db');

const createBrand = async (req, res) => {
  const { name, logo_url, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Brand name is required.' });
  }

  try {
    const sql = 'INSERT INTO Brands (name, logo_url, description) VALUES ($1, $2, $3) RETURNING *';
    const newBrand = await db.query(sql, [name, logo_url, description]);
    res.status(201).json(newBrand.rows[0]);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBrand,
};