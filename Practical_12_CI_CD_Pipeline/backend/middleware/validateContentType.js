/**
 * Content-Type Validation Middleware (Practical 4 Supplementary)
 * Enforces Content-Type: application/json for incoming POST and PUT requests.
 */
module.exports = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.toLowerCase().includes('application/json')) {
      return res.status(415).json({
        success: false,
        error: 'Unsupported Media Type',
        message: 'Content-Type header must be application/json for write requests'
      });
    }
  }
  next();
};
