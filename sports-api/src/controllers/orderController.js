const db = require('../db');

const createOrder = async (req, res) => {
  // Get the user ID from our auth middleware and the items from the request body
  const { id: userId } = req.user;
  const { items, shipping_address } = req.body; // e.g., items: [{ "variantId": "uuid", "quantity": 1 }]

  if (!items || items.length === 0 || !shipping_address) {
    return res.status(400).json({ error: 'Cart items and shipping address are required.' });
  }

  const client = await db.pool.connect();

  try {
    // START THE TRANSACTION
    await client.query('BEGIN');

    // 1. Fetch prices and check inventory in one go
    const variantIds = items.map(item => item.variantId);
    const stockAndPriceSql = `
      SELECT pv.id, pv.price, i.quantity 
      FROM ProductVariants pv 
      JOIN Inventory i ON pv.id = i.variant_id
      WHERE pv.id = ANY($1::uuid[])
    `;
    const stockAndPriceResult = await client.query(stockAndPriceSql, [variantIds]);
    
    let totalAmount = 0;
    const itemDetails = {};

    // Create a map for easy lookup
    stockAndPriceResult.rows.forEach(row => {
      itemDetails[row.id] = { price: row.price, stock: row.quantity };
    });

    for (const item of items) {
      const detail = itemDetails[item.variantId];
      if (!detail) {
        throw new Error(`Product variant with ID ${item.variantId} not found.`);
      }
      if (detail.stock < item.quantity) {
        throw new Error(`Not enough stock for variant ID ${item.variantId}.`);
      }
      totalAmount += parseFloat(detail.price) * item.quantity;
    }

    // 2. Create the main record in the Orders table
    const orderSql = `
      INSERT INTO Orders (user_id, total_amount, status, shipping_address, billing_address)
      VALUES ($1, $2, 'Pending', $3, $3)
      RETURNING id, created_at;
    `;
    // For simplicity, we'll use the shipping address as the billing address
    const newOrderResult = await client.query(orderSql, [userId, totalAmount, shipping_address]);
    const { id: orderId, created_at: orderDate } = newOrderResult.rows[0];

    // 3. Create records in the OrderItems table and update inventory
    for (const item of items) {
      const detail = itemDetails[item.variantId];
      
      const orderItemSql = `
        INSERT INTO OrderItems (order_id, variant_id, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4);
      `;
      await client.query(orderItemSql, [orderId, item.variantId, item.quantity, detail.price]);

      const updateInventorySql = `
        UPDATE Inventory SET quantity = quantity - $1 WHERE variant_id = $2;
      `;
      await client.query(updateInventorySql, [item.quantity, item.variantId]);
    }

    // COMMIT THE TRANSACTION
    await client.query('COMMIT');

    res.status(201).json({ 
      message: 'Order created successfully!',
      orderId,
      orderDate,
      totalAmount 
    });

  } catch (error) {
    // If any error occurs, roll back the transaction
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message || 'Failed to create order.' });
  } finally {
    client.release();
  }
};

module.exports = {
  createOrder,
};