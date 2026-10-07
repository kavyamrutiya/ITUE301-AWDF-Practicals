require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const debugRoutes = require('./routes/debugRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 1. CORS
app.use(cors());

// 2. Request Logger
app.use(logger);

// 3. Content-Type Validator
app.use(validateContentType);

// 4. Body Parser
app.use(express.json());

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

// Debug & Cache Telemetry Routes
app.use('/api/debug', debugRoutes);
app.use('/debug', debugRoutes);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 9: In-Memory Caching (node-cache) + JWT Authentication',
    caching: 'node-cache (stdTTL: 60s, Cache-Aside pattern)',
    debugEndpoints: {
      cacheStats: 'GET /api/debug/cache',
      cacheReset: 'POST /api/debug/cache/reset',
      cacheClear: 'POST /api/debug/cache/clear',
      cacheToggle: 'POST /api/debug/cache/toggle'
    }
  });
});

// 6. 404 Handler
app.use(notFound);

// 7. Global Error Handler
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Practical 9 Server running on port ${PORT}`);
    console.log(`Cache Debug endpoint: http://localhost:${PORT}/api/debug/cache`);
  });
}

module.exports = app;
