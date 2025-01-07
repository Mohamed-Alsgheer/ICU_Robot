import { Router } from "express";
import icuControler from "../controllers/icuController.js";
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
const icuRouter = Router();



// CRUDS for ICUs

// Create an ICU
icuRouter.post('/icus', verifyToken, authorizeRoles("hospitalAdmin"), icuControler.create_icu);

// Get all ICUs
icuRouter.get('/icus', verifyToken, authorizeRoles("hospitalAdmin"), icuControler.find_icus);

// Get ICUs by hospital ID
icuRouter.get('/icus/hospital/:hospitalID', verifyToken, authorizeRoles("hospitalAdmin"), icuControler.find_icu_byHospitalID);

// Update an ICU by ID
icuRouter.put('/icus/:id', verifyToken, authorizeRoles("hospitalAdmin"), icuControler.update_icu);

// Delete an ICU by ID
icuRouter.delete('/icus/:id', verifyToken, authorizeRoles("hospitalAdmin"), icuControler.delete_icu);

export default icuRouter;