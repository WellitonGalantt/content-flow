import Router from 'express';
import { AuthController } from '../controllers/AuthControllers';
import { Middlewares } from '../middlewares/Middleware';
import { loginSchema, registerSchema } from '../shared/schemas/authSchemas';

const authRouter = Router();

authRouter.post('/register', Middlewares.validateSchema(registerSchema), AuthController.registerUser);

// authRouter.post('/register/telephone', AuthController.registerTelephone);

authRouter.post('/login', Middlewares.validateSchema(loginSchema), AuthController.loginUser);

authRouter.delete('/delete/:id', AuthController.deleteUser);

export default authRouter;
