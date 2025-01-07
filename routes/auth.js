import { Router } from "express";
// import AuthService from "../services/productService";
import AuthController from "../controllers/authController.js";


const authRouter = Router();


authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);



export default authRouter;