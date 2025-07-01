import { Router } from 'express';
import { forgotPasswordController, logoutController, refreshTokenController, registerUserControllers, resetPasswordController, updateUserDetailsController, uploadAvatarController, userDetailsController, verifyForgotPasswordOtpController } from '../controllers/user.controllers.js';
import { verifyEmailController } from '../controllers/user.controllers.js';
import { loginController } from '../controllers/user.controllers.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';


const userRouter = Router();

userRouter.post('/register',registerUserControllers);
userRouter.post('/verify-email',verifyEmailController);
userRouter.post('/login',loginController);
userRouter.get('/logout',auth,logoutController);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatarController);
userRouter.put('/update-user',auth,updateUserDetailsController);
userRouter.put('/forgot-password',forgotPasswordController);
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtpController);
userRouter.put('/reset-password',resetPasswordController);
userRouter.post('/refresh-token',refreshTokenController);
userRouter.get('/user-details',auth,userDetailsController);


export default userRouter