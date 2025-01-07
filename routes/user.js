import express from 'express';
import UserController from '../controllers/UserController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
const userRouter = express.Router();

// create user (hospital admin)
userRouter.post('/create_hospitalAdmin',verifyToken, authorizeRoles("superAdmin"), UserController.create_hospital_admin);

// find all users
userRouter.get('/users', verifyToken, authorizeRoles("superAdmin"), UserController.getAllUsers);

// find user by id
userRouter.get('/users/:id', verifyToken, authorizeRoles("superAdmin"), UserController.getUserById);

// update user
userRouter.put('/users/:id/password', verifyToken, authorizeRoles("superAdmin"), UserController.updatePassword);


userRouter.put('/users/:id', verifyToken, authorizeRoles("superAdmin"), UserController.updateUserData);

// تحديث دور المستخدم (مناسب فقط للمشرفين)
userRouter.delete('/users/:id', verifyToken, authorizeRoles("superAdmin"), UserController.delete_user);

export default userRouter;
