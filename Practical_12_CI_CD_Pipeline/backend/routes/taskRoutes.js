const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateObjectId = require('../middleware/validateObjectId');
const protect = require('../middleware/auth');

// Public READ access (Allows GET /tasks to return 200 as specified in Practical 12 syllabus)
// State mutations (POST, PUT, DELETE) are strictly protected by JWT auth middleware
router.route('/')
  .get(taskController.getAllTasks)
  .post(protect, taskController.createTask);

router.route('/:id')
  .get(validateObjectId, taskController.getTaskById)
  .put(protect, validateObjectId, taskController.updateTask)
  .delete(protect, validateObjectId, taskController.deleteTask);

module.exports = router;
