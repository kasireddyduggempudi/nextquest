const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'Forbidden to Access without Token' });
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid Token. Please login again!!' });
      req.userId = decoded.userId;
      next();
    });
};

module.exports = verifyToken;