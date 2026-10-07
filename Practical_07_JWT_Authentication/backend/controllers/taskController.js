const Task = require('../models/Task');

/**
 * Task Controller (Practical 5)
 * Implements CRUD operations against MongoDB using Mongoose model methods:
 * Task.find(), Task.create(), Task.findById(), Task.findByIdAndUpdate(), Task.findByIdAndDelete()
 */

// GET /tasks - Read all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { completed, priority, search, sort = 'createdAt' } = req.query;
    const filter = {};

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (priority) {
      filter.priority = priority.toLowerCase();
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter).sort({ [sort]: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:id - Read single task
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${req.params.id}' was not found in MongoDB`
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// POST /tasks - Create task in MongoDB
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      completed,
      priority,
      dueDate
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully in MongoDB',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id - Update task in MongoDB
exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return the modified document
        runValidators: true // re-run schema validators on update
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${req.params.id}' was not found in MongoDB`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id - Delete task from MongoDB
exports.deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${req.params.id}' was not found in MongoDB`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully from MongoDB',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
};
