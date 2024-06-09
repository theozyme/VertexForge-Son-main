import express from 'express';
import * as listController from '../controllers/listController.js';

const ListRoute = express.Router();

// Create a new List
ListRoute.route('/createList').post(listController.createList);

// Get a single List by id
ListRoute.route('/getList/:id').get(listController.getList);

// Update a List by id
ListRoute.route('/updateList/:id').put(listController.updateList);

// Delete a List by id
ListRoute.route('/deleteList/:id').delete(listController.deleteList);

export default ListRoute;
