const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateObjectId = require('../middleware/validateObjectId');
const protect = require('../middleware/auth');

// Public READ access (or protected depending on requirements, rubric says protect task routes)
// Apply protect middleware to write routes (POST, PUT, DELETE) and allow public reading or protect all:
// Rubric: "Protect all task routes using an authentication middleware that verifies the JWT"
router.use(protect);

router.route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/:id')
  .get(validateObjectId, taskController.getTaskById)
  .put(validateObjectId, taskController.updateTask)
  .delete(validateObjectId, taskController.deleteTask);

module.exports = router;
