const express = require('express');
const router = express.Router();
const {
  getStats,
  resetStats,
  clearData,
  setCacheEnabled
} = require('../config/cache');

// GET /api/debug/cache - Return hit/miss metrics and stats
router.get('/cache', (req, res) => {
  res.status(200).json({
    success: true,
    data: getStats()
  });
});

// POST /api/debug/cache/reset - Reset metrics
router.post('/cache/reset', (req, res) => {
  const stats = resetStats();
  res.status(200).json({
    success: true,
    message: 'Cache statistics reset',
    data: stats
  });
});

// POST /api/debug/cache/clear - Clear data
router.post('/cache/clear', (req, res) => {
  const stats = clearData();
  res.status(200).json({
    success: true,
    message: 'Cache memory flushed',
    data: stats
  });
});

// POST /api/debug/cache/toggle - Toggle cache on/off
router.post('/cache/toggle', (req, res) => {
  const { enabled } = req.body || {};
  const newState = setCacheEnabled(enabled !== undefined ? enabled : true);
  res.status(200).json({
    success: true,
    message: `Cache is now ${newState ? 'ENABLED' : 'DISABLED'}`,
    data: getStats()
  });
});

module.exports = router;
