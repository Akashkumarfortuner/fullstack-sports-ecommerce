require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Import the 'cors' package

// Import our routes
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3001; // Using 3001 as the default

// --- Middleware ---
// 2. Use cors() to allow cross-origin requests from your frontend
// This MUST come before your routes are defined.
app.use(cors());

// This middleware parses incoming JSON requests
app.use(express.json());


// --- Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Sports API!');
});

// Use our routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});