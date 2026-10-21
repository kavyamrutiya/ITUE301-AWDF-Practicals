const mongoose = require('mongoose');

/**
 * Task Schema (Practical 5)
 * Fields:
 *  - title: String, required, minlength 3, pre-save hook to trim whitespace
 *  - description: String, optional, trimmed
 *  - completed: Boolean, default false
 *  - priority: String, enum ['low', 'medium', 'high'], default 'medium'
 *  - dueDate: Date, optional
 *  - timestamps: true (createdAt, updatedAt)
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      minlength: [3, 'Task title must be at least 3 characters long'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be either low, medium, or high'
      },
      default: 'medium'
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook: automatically trim whitespace from title
taskSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
