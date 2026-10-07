require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 1. Global Request Logger Middleware
app.use(logger);

// 2. Content-Type Validation Middleware
app.use(validateContentType);

// 3. JSON Body Parsing Middleware
app.use(express.json());

// 4. API Routes
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 5: Task Management API (MongoDB + Mongoose ODM)',
    database: 'Connected via Mongoose',
    endpoints: {
      getAllTasks: 'GET /tasks',
      getTaskById: 'GET /tasks/:id',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

// 5. 404 Handler (registered after routes)
app.use(notFound);

// 6. Centralized Error Handler (must be LAST)
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running in Practical 5 mode on port ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_practical5'}`);
  });
}

module.exports = app;
