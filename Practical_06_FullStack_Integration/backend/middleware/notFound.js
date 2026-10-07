/**
 * 404 Catch-All Middleware (Practical 4)
 * Handles requests to unregistered endpoints and returns structured JSON.
 */
module.exports = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint does not exist`
  });
};
