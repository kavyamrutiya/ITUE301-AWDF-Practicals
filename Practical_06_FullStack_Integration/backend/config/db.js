const mongoose = require('mongoose');

/**
 * MongoDB Connection Handler (Practical 5)
 * Connects to MongoDB via Mongoose using the connection URI from environment variables.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_practical5';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[DATABASE ERROR] Failed to connect to MongoDB: ${error.message}`);
    // Only exit in production/standalone mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
