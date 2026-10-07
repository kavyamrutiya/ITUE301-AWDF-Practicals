const Task = require('../models/Task');
const {
  cache,
  isCacheEnabled,
  incrementHits,
  incrementMisses,
  logSet,
  logInvalidate
} = require('../config/cache');

/**
 * Task Controller with In-Memory Caching (Practical 9)
 * Reads: Check node-cache first (Cache-Aside Pattern)
 * Writes: Invalidate cache keys on mutation (POST, PUT, DELETE)
 */

// GET /tasks - Read all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { completed, priority, search, sort = 'createdAt' } = req.query;
    const isDefaultQuery = !completed && !priority && !search && sort === 'createdAt';
    const cacheKey = 'all_tasks';

    // 1. Check cache for default listing
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

    // 2. Query MongoDB on Cache Miss or filtered query
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

    // 3. Store in cache on miss for 60 seconds
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

// GET /tasks/:id - Single task cache
exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `task_${id}`;

    if (isCacheEnabled()) {
      const cached = cache.get(cacheKey);
      if (cached) {
        incrementHits();
        return res.status(200).json({
          success: true,
          source: 'cache-hit',
          data: cached
        });
      }
      incrementMisses();
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${id}' not found`
      });
    }

    if (isCacheEnabled()) {
      cache.set(cacheKey, task);
      logSet(cacheKey);
    }

    return res.status(200).json({
      success: true,
      source: 'cache-miss (queried database)',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// POST /tasks - Create task and invalidate cache
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

    // Invalidate all_tasks cache key so next GET retrieves fresh data
    if (isCacheEnabled()) {
      cache.del('all_tasks');
      logInvalidate('all_tasks');
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully in MongoDB',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id - Update task and invalidate cache
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${id}' not found`
      });
    }

    // Invalidate affected cache keys
    if (isCacheEnabled()) {
      cache.del('all_tasks');
      cache.del(`task_${id}`);
      logInvalidate(`all_tasks and task_${id}`);
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

// DELETE /tasks/:id - Delete task and invalidate cache
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id '${id}' not found`
      });
    }

    // Invalidate affected cache keys
    if (isCacheEnabled()) {
      cache.del('all_tasks');
      cache.del(`task_${id}`);
      logInvalidate(`all_tasks and task_${id}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
};
