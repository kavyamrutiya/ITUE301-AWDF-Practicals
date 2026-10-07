/**
 * Global Centralized Error Handler (Practical 5)
 * Formats Mongoose ValidationErrors and CastErrors as clean structured JSON.
 */
module.exports = (err, req, res, next) => {
  console.error('[ERROR HANDLER]:', err.message);

  // Mongoose Validation Error (HTTP 400)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      errors: messages,
      message: messages.join(', ')
    });
  }

  // Mongoose Invalid ObjectId (HTTP 400)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: `Resource with id '${err.value}' is not a valid ObjectId`
    });
  }

  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
};
