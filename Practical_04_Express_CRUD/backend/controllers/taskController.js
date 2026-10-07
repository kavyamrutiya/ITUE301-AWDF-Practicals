/**
 * Task Controller (Practical 4)
 * Implements CRUD operations against an in-memory task array.
 * Note: MongoDB is deliberately not used here; it is introduced in Practical 5.
 */

let tasks = [
  {
    id: '1',
    title: 'Setup Node & Express Environment',
    description: 'Scaffold project with npm init and install express framework',
    completed: true,
    priority: 'high',
    createdAt: new Date('2026-08-01T10:00:00Z').toISOString()
  },
  {
    id: '2',
    title: 'Implement Middleware Pipeline',
    description: 'Configure custom request logger, Content-Type validator, and 404 handler',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2026-08-02T11:30:00Z').toISOString()
  },
  {
    id: '3',
    title: 'Design RESTful CRUD Endpoints',
    description: 'Build GET, POST, PUT, DELETE /tasks with proper status codes',
    completed: false,
    priority: 'high',
    createdAt: new Date('2026-08-03T14:15:00Z').toISOString()
  }
];

let nextId = 4;

// GET /tasks (or /api/tasks) - Read all tasks
exports.getAllTasks = (req, res) => {
  const { completed, priority, search } = req.query;
  let results = [...tasks];

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    results = results.filter((t) => t.completed === isCompleted);
  }

  if (priority) {
    results = results.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }

  return res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
};

// GET /tasks/:id - Read single task
exports.getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id '${req.params.id}' was not found`
    });
  }

  return res.status(200).json({
    success: true,
    data: task
  });
};

// POST /tasks - Create task
exports.createTask = (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body || {};

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Field "title" is required and cannot be empty'
      });
    }

    const newTask = {
      id: String(nextId++),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: Boolean(completed),
      priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id - Update task
exports.updateTask = (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Task with id '${req.params.id}' was not found`
      });
    }

    const { title, description, completed, priority } = req.body || {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Title cannot be empty when provided'
        });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (description !== undefined) {
      tasks[taskIndex].description = description.trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    if (priority !== undefined) {
      if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Priority must be one of: low, medium, high'
        });
      }
      tasks[taskIndex].priority = priority;
    }

    tasks[taskIndex].updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: tasks[taskIndex]
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id - Delete task
exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with id '${req.params.id}' was not found`
    });
  }

  const removed = tasks.splice(taskIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: removed
  });
};
