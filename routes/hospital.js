import express from "express";
import HospitalControler from '../controllers/HospitalControler.js';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
const hospitalRouter = express.Router();



// Create a hospital
hospitalRouter.post('/hospital', verifyToken, authorizeRoles("superAdmin"), HospitalControler.create_hospital);

// Get all hospitals
hospitalRouter.get('/hospitals', verifyToken, authorizeRoles("superAdmin"), HospitalControler.find_hospitals);

// Get a hospital by name
hospitalRouter.get('/hospitals/name/:name', verifyToken, authorizeRoles("superAdmin"), HospitalControler.find_hospital_byName);

// Update a hospital by name
hospitalRouter.put('/hospitals/name/:name', verifyToken, authorizeRoles("superAdmin"), HospitalControler.update_hospital);

// Delete a hospital by name
hospitalRouter.delete('/hospitals/name/:name', verifyToken, authorizeRoles("superAdmin"), HospitalControler.delete_hospital);


export default hospitalRouter;