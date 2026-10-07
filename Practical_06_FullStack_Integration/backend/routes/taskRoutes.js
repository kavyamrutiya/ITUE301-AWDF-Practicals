const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateObjectId = require('../middleware/validateObjectId');

// /tasks routes
router.route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/:id')
  .get(validateObjectId, taskController.getTaskById)
  .put(validateObjectId, taskController.updateTask)
  .delete(validateObjectId, taskController.deleteTask);

module.exports = router;
