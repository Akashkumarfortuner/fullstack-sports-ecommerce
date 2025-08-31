const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the request header
  const authHeader = req.headers.authorization;

  // 2. Check if the token exists and is in the correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided or invalid format.' });
  }
  
  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    // 3. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If valid, attach the user's info to the request object
    // The `decoded.user` comes from the `payload` we created during login
    req.user = decoded.user;

    // 5. Call `next()` to pass control to the actual route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

module.exports = authMiddleware;