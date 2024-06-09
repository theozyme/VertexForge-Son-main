import express from 'express';
import * as bireyselController from '../controllers/bireyselController.js';
// import authMiddleware from '../middlewares/authMiddleware';


const BireyselRoute = express.Router();


// Create a new Student
BireyselRoute.route('/createbireysel').post(bireyselController.createbireysel);

// Get all Students
//BireyselRoute.route('/getAllbireysel').get(bireyselController.getAllbireysel);

// Get a single Student by id
BireyselRoute.route('/getbireysel').get(bireyselController.getbireysel);

// Update a Student by id
BireyselRoute.route('/updatebireysel').put(bireyselController.updatebireysel);

// Delete a Student by id
BireyselRoute.route('/deletebireysel').delete(bireyselController.deletebireysel);

export default BireyselRoute;