const Task = require('../models/Task');
const taskEvents = require('../events/taskEvents');
const {
  cache,
  isCacheEnabled,
  incrementHits,
  incrementMisses,
  logSet,
  logInvalidate
} = require('../config/cache');

// GET /tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { completed, priority, search, sort = 'createdAt' } = req.query;
    const isDefaultQuery = !completed && !priority && !search && sort === 'createdAt';
    const cacheKey = 'all_tasks';

    if (isCacheEnabled() && isDefaultQuery) {
      const cached = cache.get(cacheKey);
      if (cached) {
        incrementHits();
        return res.status(200).json({
          success: true,
          source: 'cache-hit',
          count: cached.length,
          data: cached
        });
      }
      incrementMisses();
    }

    const filter = {};
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority.toLowerCase();
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter).sort({ [sort]: -1 });

    if (isCacheEnabled() && isDefaultQuery) {
      cache.set(cacheKey, tasks);
      logSet(cacheKey);
    }

    return res.status(200).json({
      success: true,
      source: isDefaultQuery ? 'cache-miss (queried database)' : 'database (filtered)',
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `task_${id}`;

    if (isCacheEnabled()) {
      const cached = cache.get(cacheKey);
      if (cached) {
        incrementHits();
        return res.status(200).json({ success: true, source: 'cache-hit', data: cached });
      }
      incrementMisses();
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task '${id}' not found` });
    }

    if (isCacheEnabled()) {
      cache.set(cacheKey, task);
      logSet(cacheKey);
    }

    return res.status(200).json({ success: true, source: 'cache-miss', data: task });
  } catch (err) {
    next(err);
  }
};

// POST /tasks - Create Task + EventEmitter (Practical 10)
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    // 1. Save to MongoDB
    const newTask = await Task.create({
      title,
      description,
      completed,
      priority,
      dueDate
    });

    // 2. Invalidate cache
    if (isCacheEnabled()) {
      cache.del('all_tasks');
      logInvalidate('all_tasks');
    }

    // 3. Respond to client IMMEDIATELY
    const apiSentAt = new Date().toISOString();
    console.log(`[API] Response SENT at ${apiSentAt} (Status 201)`);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      apiSentAt,
      data: newTask
    });

    // 4. Emit event asynchronously in next tick
    setImmediate(() => {
      taskEvents.emit('task-created', {
        id: newTask._id,
        title: newTask.title,
        priority: newTask.priority,
        user: req.user ? req.user.name : 'Authenticated User',
        apiSentAt
      });
    });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task '${id}' not found` });
    }

    if (isCacheEnabled()) {
      cache.del('all_tasks');
      cache.del(`task_${id}`);
      logInvalidate(`all_tasks and task_${id}`);
    }

    return res.status(200).json({ success: true, message: 'Task updated successfully', data: updatedTask });
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id - Delete Task + EventEmitter (Practical 10)
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task '${id}' not found` });
    }

    if (isCacheEnabled()) {
      cache.del('all_tasks');
      cache.del(`task_${id}`);
      logInvalidate(`all_tasks and task_${id}`);
    }

    const apiSentAt = new Date().toISOString();
    console.log(`[API] Delete response SENT at ${apiSentAt} (Status 200)`);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      apiSentAt,
      data: deletedTask
    });

    // Emit task-deleted event
    setImmediate(() => {
      taskEvents.emit('task-deleted', {
        id: deletedTask._id,
        title: deletedTask.title,
        apiSentAt
      });
    });
  } catch (err) {
    next(err);
  }
};
