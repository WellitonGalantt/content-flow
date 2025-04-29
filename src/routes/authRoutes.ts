import Router from 'express';
import { AuthController } from '../controllers/AuthControllers';

const authRouter = Router();

authRouter.post('/register', AuthController.registerUser);

// authRouter.post('/register/telephone', AuthController.registerTelephone);

authRouter.post('/login', AuthController.loginUser);

authRouter.delete('/delete/:id', AuthController.deleteUser);

export default authRouter;
