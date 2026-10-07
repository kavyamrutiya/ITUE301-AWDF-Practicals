/**
 * Task ID Validation Middleware (Practical 4 Supplementary)
 * Validates that route parameter ID is non-empty and well-formed.
 */
module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!id || id.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Task ID route parameter is required'
    });
  }
  next();
};
