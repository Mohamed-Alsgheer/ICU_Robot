// routes/robot.js
import express from 'express';
import RobotController from '../controllers/robotController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
const robotRouter = express.Router();

// Create a new robot
robotRouter.post('/robot', verifyToken, authorizeRoles("superAdmin"), RobotController.create_robot);

// Get all robots
robotRouter.get('/robots', verifyToken, authorizeRoles("superAdmin"), RobotController.find_robots);

// Get a robot by ID
robotRouter.get('/robot/:id', verifyToken, authorizeRoles("superAdmin"), RobotController.find_robot_byID);

// Update a robot by ID
robotRouter.put('/robot/:id', verifyToken, authorizeRoles("superAdmin"), RobotController.update_robot);

// Delete a robot by ID
robotRouter.delete('/robot/:id', verifyToken, authorizeRoles("superAdmin"), RobotController.delete_robot);

export default robotRouter;
