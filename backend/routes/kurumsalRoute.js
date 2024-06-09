import express from 'express';
import * as kurumsalController from '../controllers/kurumsalController.js';
// import authMiddleware from '../middlewares/authMiddleware';


const KurumsalRoute = express.Router();


// Create a new Student
KurumsalRoute.route('/createkurumsal').post(kurumsalController.createkurumsal);

// Get all Students
//KurumsalRoute.route('/getAllkurumsal').get(kurumsalController.getAllkurumsal);

// Get a single Student by id
KurumsalRoute.route('/getkurumsal').get(kurumsalController.getkurumsal);

KurumsalRoute.route('/updatekurumsal').put(kurumsalController.updatekurumsal);

// Delete a Student by id
KurumsalRoute.route('/deletekurumsal').delete(kurumsalController.deletekurumsal);

export default KurumsalRoute;