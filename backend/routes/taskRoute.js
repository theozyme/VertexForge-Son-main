import express from 'express';
import * as taskController from '../controllers/taskController.js';

const TaskRoute = express.Router();

// Create a new Task
TaskRoute.route('/createTask').post(taskController.createTask);

// Get a single Task by id
TaskRoute.route('/getTask/:id').get(taskController.getTask);

// Update a Task by id
TaskRoute.route('/updateTask/:id').put(taskController.updateTask);

// Delete a Task by id
TaskRoute.route('/deleteTask/:id').delete(taskController.deleteTask);

export default TaskRoute;
