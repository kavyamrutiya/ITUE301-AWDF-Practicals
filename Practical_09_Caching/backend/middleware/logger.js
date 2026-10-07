/**
 * Request Logging Middleware (Practical 4)
 * Logs HTTP Method, Request URL, and ISO Timestamp for every incoming request.
 */
module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] ${req.method} ${req.url} - ${timestamp}`);
  next();
};
