const db = require('../db');

const createCategory = async (req, res) => {
  // A category needs a name and can optionally have a sport_id
  const { name, sport_id } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  try {
    // Corrected table name to lowercase 'categories'
    const sql = 'INSERT INTO categories (name, sport_id) VALUES ($1, $2) RETURNING *';
    const newCategory = await db.query(sql, [name, sport_id]);

    res.status(201).json(newCategory.rows[0]);

  } catch (error) {
    console.error('Error creating category:', error);
    // Handle potential error if the sport_id does not exist
    if (error.code === '23503') { // Foreign key violation
      return res.status(400).json({ error: 'Invalid sport_id. The specified sport does not exist.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Corrected table name to lowercase 'categories'
    const categories = await db.query('SELECT id, name FROM categories ORDER BY name');
    res.status(200).json(categories.rows);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};