/**
 * Authentication Input Validation Middleware (Practical 7)
 * Enforces at least 3 validation rules:
 *  1. Required fields presence
 *  2. Valid email regex format
 *  3. Minimum password length (6 characters)
 */

exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};
  const errors = [];

  // Rule 1: Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  // Rule 2: Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required');
  }

  // Rule 3: Password length validation
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      errors,
      message: errors.join(' | ')
    });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password || !password.trim()) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      errors,
      message: errors.join(' | ')
    });
  }

  next();
};
