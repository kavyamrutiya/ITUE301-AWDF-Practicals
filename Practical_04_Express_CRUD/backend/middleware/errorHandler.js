/**
 * Global Centralized Error Handler (Practical 4)
 * Defined LAST in the pipeline with signature: (err, req, res, next)
 * Returns clean structured JSON error response without leaking sensitive stack traces.
 */
module.exports = (err, req, res, next) => {
  console.error('[GLOBAL ERROR HANDLER]:', err.stack || err.message);

  const statusCode = err.statusCode || res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
};
