const mongoose = require('mongoose');

/**
 * MongoDB Connection Handler (Practical 5 & Practical 12)
 * Connects to MongoDB via Mongoose using the connection URI from environment variables.
 * In CI/test environments, applies responsive connection timeouts to prevent hung processes.
 */
const connectDB = async () => {
  // If explicitly flagged to skip in lightweight unit test environments
  if (process.env.NODE_ENV === 'test' && process.env.MOCK_DB === 'true') {
    return null;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_practical12';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: process.env.NODE_ENV === 'test' ? 1500 : 30000
    });
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`[DATABASE ERROR] Failed to connect to MongoDB: ${error.message}`);
    }
    // Only exit in production/standalone mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
