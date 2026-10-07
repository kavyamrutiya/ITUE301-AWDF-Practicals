const express = require('express');
const logger = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Global Request Logger Middleware
app.use(logger);

// 2. Content-Type Validation Middleware (enforces application/json before body parser)
app.use(validateContentType);

// 3. JSON Body Parsing Middleware
app.use(express.json());

// 4. API Routes (mounted on both /tasks and /api/tasks for maximum client compatibility)
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// Root Welcome / Health Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 4: Task Manager RESTful API (In-Memory Array)',
    endpoints: {
      getAllTasks: 'GET /tasks',
      getTaskById: 'GET /tasks/:id',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

// 5. 404 Handler for undefined routes (registered after all routes)
app.use(notFound);

// 6. Global Centralized Error Handler (must be LAST)
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running in Practical 4 mode on port ${PORT}`);
    console.log(`Base URL: http://localhost:${PORT}/tasks`);
  });
}

module.exports = app;
