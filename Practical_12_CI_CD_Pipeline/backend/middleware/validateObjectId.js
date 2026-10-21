const mongoose = require('mongoose');

/**
 * ObjectId Validation Middleware (Practical 5)
 * Checks if the route parameter 'id' is a valid 24-character hexadecimal MongoDB ObjectId.
 */
module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Identifier',
      message: `'${id}' is not a valid 24-character MongoDB ObjectId`
    });
  }
  next();
};
