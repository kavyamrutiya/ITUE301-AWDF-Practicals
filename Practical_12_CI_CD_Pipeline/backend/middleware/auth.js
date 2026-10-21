const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * JWT Authentication Middleware (Practical 7)
 * Verifies Bearer token from Authorization header and sets req.user
 */
module.exports = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Access denied. No authentication token provided in Authorization header'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'supersecretjwtkey_awdf_2026_practical7';
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'The user belonging to this token no longer exists'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('[AUTH ERROR]:', err.message);
    const message =
      err.name === 'TokenExpiredError'
        ? 'Authentication token has expired. Please log in again.'
        : 'Invalid authentication token signature.';

    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message
    });
  }
};
