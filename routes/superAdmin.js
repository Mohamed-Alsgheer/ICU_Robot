import express from 'express';
import UserController from '../controllers/UserController.js';
import SuperAdminController from '../controllers/superAdminController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
const userRouter = express.Router();

// create user (hospital admin)
// /superAdmin/user
userRouter.post('/users',verifyToken, authorizeRoles("superAdmin"), SuperAdminController.createUser);


// update user
userRouter.put('/users/:id', verifyToken, authorizeRoles("superAdmin"), SuperAdminController.updateUser);


// show all users
userRouter.get('/users', verifyToken, authorizeRoles("superAdmin"), SuperAdminController.showAllUsers);


// find user by id
userRouter.get('/users/:id', verifyToken, authorizeRoles("superAdmin"), SuperAdminController.getUserById);


// تحديث دور المستخدم (مناسب فقط للمشرفين)
userRouter.delete('/users/:id', verifyToken, authorizeRoles("superAdmin"), SuperAdminController.delete_user);

export default userRouter;
