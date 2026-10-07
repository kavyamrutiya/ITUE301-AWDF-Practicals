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

const app = express();

// Connect to MongoDB
connectDB();

// 1. CORS Middleware
app.use(cors());

// 2. Request Logger
app.use(logger);

// 3. Content-Type Validation
app.use(validateContentType);

// 4. JSON Body Parser
app.use(express.json());

// 5. Auth Routes (Mounted on /api/auth and /auth)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// 6. Protected Task Routes (Mounted on /api/tasks and /tasks)
app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Practical 7: JWT Authentication & Middleware Pipeline',
    authEndpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      currentUser: 'GET /api/auth/me (Protected)'
    },
    taskEndpoints: {
      tasks: 'GET, POST, PUT, DELETE /api/tasks (Protected with Bearer Token)'
    }
  });
});

// 7. 404 Handler
app.use(notFound);

// 8. Global Error Handler
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Practical 7 Server running on port ${PORT}`);
    console.log(`Base URL: http://localhost:${PORT}`);
  });
}

module.exports = app;
