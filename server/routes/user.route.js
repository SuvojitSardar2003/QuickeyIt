import { Router } from 'express';
import { logoutController, registerUserControllers } from '../controllers/user.controllers.js';
import { verifyEmailController } from '../controllers/user.controllers.js';
import { loginController } from '../controllers/user.controllers.js';
import auth from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/register',registerUserControllers);
userRouter.post('/verify-email',verifyEmailController);
userRouter.post('/login',loginController);
userRouter.get('/logout',auth,logoutController);

export default userRouter