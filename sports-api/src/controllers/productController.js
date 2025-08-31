const db = require('../db');

const createProduct = async (req, res) => {
  const { name, description, brand_id, category_id } = req.body;

  if (!name || !brand_id || !category_id) {
    return res.status(400).json({ 
      error: 'Product name, brand_id, and category_id are required.' 
    });
  }

  try {
    const sql = `
      INSERT INTO products (name, description, brand_id, category_id, updated_at) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING *
    `;
    const newProduct = await db.query(sql, [name, description, brand_id, category_id]);
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === '23503') {
      return res.status(400).json({ 
        error: 'Invalid brand_id or category_id. The specified brand or category does not exist.' 
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProductVariant = async (req, res) => {
  const { productId } = req.params;
  const { sku, price, discount_price, attributes, image_urls } = req.body;

  if (!sku || !price || !attributes) {
    return res.status(400).json({ error: 'SKU, price, and attributes are required.' });
  }

  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');
    const variantSql = `
      INSERT INTO productvariants (product_id, sku, price, discount_price, attributes, image_urls)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const newVariantResult = await client.query(variantSql, [productId, sku, price, discount_price, attributes, image_urls]);
    const newVariant = newVariantResult.rows[0];
    const inventorySql = `
      INSERT INTO inventory (variant_id, quantity)
      VALUES ($1, 0)
    `;
    await client.query(inventorySql, [newVariant.id]);
    await client.query('COMMIT');
    res.status(201).json(newVariant);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating product variant:', error);
    if (error.code === '23503') {
      return res.status(404).json({ error: 'The specified product does not exist.' });
    }
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This SKU already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};

// THIS FUNCTION HAS BEEN REPLACED
const getAllProducts = async (req, res) => {
  try {
    // This query now also selects the image_urls array
    const sql = `
      SELECT DISTINCT ON (p.id)
        p.id,
        p.name,
        p.description,
        p.is_active,
        b.name AS brand_name,
        c.name AS category_name,
        pv.price,
        pv.image_urls,
        p.created_at
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN productvariants pv ON p.id = pv.product_id
      WHERE p.is_active = TRUE
      -- We prioritize variants that have an image
      ORDER BY p.id, pv.image_urls NULLS LAST, pv.price ASC;
    `;
    const products = await db.query(sql);
    res.status(200).json(products.rows);
  } catch (error)    {
    console.error('Error getting all products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const productSql = `
      SELECT
        p.id, p.name, p.description,
        b.name AS brand_name, c.name AS category_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.is_active = TRUE;
    `;
    const productResult = await db.query(productSql, [productId]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    const product = productResult.rows[0];

    const variantsSql = `
      SELECT
        pv.id AS variant_id, pv.sku, pv.price, pv.discount_price,
        pv.attributes, pv.image_urls, i.quantity
      FROM productvariants pv
      LEFT JOIN inventory i ON pv.id = i.variant_id
      WHERE pv.product_id = $1;
    `;
    const variantsResult = await db.query(variantsSql, [productId]);
    
    product.variants = variantsResult.rows;
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProduct,
  createProductVariant,
  getAllProducts,
  getProductById,
};