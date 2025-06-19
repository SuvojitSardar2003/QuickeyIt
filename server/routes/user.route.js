import { Router } from 'express';
import { registerUserControllers } from '../controllers/user.controllers.js';
import { verifyEmailController } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.post('/register',registerUserControllers);
userRouter.post('/verify-email',verifyEmailController);

export default userRouter