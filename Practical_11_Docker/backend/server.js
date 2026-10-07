require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Register Event Listeners at server startup (Practical 10)
require('./events/taskListeners');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const debugRoutes = require('./routes/debugRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(logger);
app.use(validateContentType);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

app.use('/api/debug', debugRoutes);
app.use('/debug', debugRoutes);

// Root
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 10: Event-Driven Asynchronous Processing (EventEmitter)',
    architecture: 'Native Node.js EventEmitter (Non-blocking notification pipeline)',
    events: ['task-created', 'task-deleted', 'error']
  });
});

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Practical 10 Server running on port ${PORT}`);
    console.log(`Base URL: http://localhost:${PORT}`);
  });
}

module.exports = app;
