require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 1. CORS Middleware (allows React frontend on port 5173 to communicate)
app.use(cors());

// 2. Global Request Logger
app.use(logger);

// 3. Content-Type Validation Middleware
app.use(validateContentType);

// 4. JSON Body Parser
app.use(express.json());

// 5. Task CRUD Routes
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 6 Full-Stack Backend API (Express + MongoDB)',
    cors: 'Enabled for all origins',
    endpoints: {
      getAllTasks: 'GET /tasks',
      getTaskById: 'GET /tasks/:id',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
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
    console.log(`Practical 6 Backend running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/tasks`);
  });
}

module.exports = app;
