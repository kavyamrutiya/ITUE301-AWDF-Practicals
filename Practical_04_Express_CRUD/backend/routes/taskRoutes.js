const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTaskId = require('../middleware/validateTaskId');

// Route definitions for /tasks
router.route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/:id')
  .get(validateTaskId, taskController.getTaskById)
  .put(validateTaskId, taskController.updateTask)
  .delete(validateTaskId, taskController.deleteTask);

module.exports = router;
