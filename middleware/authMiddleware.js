const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and verify JWT token
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Extract token from Authorization header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Check if user role is allowed
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized', error: error.message });
    }
  };
};

module.exports = authMiddleware;
