import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplete.js";
import sendEmail from "../config/sendEmail.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

//New User Registration
export async function registerUserControllers(request,response) {
    try {
        const { name, email, password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "Provide email,name,password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already registered email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailURL= `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from QuickeyIt",
            html : verifyEmailTemplate({
                name,
                 url: verifyEmailURL
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//Email Verification
export async function verifyEmailController(requst,response) {
    try {
        const { code }= requst.body;
        const user = await UserModel.findOne({_id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({_id : code }, { verify_email : true})

        return response.json({
            message:"Verification Successful",
            error : false,
            success : true
        })
    } catch (error) {
        
    }
}

//User login controller
export async function loginController(request,response) {
    try {
        const { email, password} = request.body;

        if(!email || !password){
            return response.status(400).json({
                message : "Provide Email and Password",
                error : true,
                succcess : false
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user){
            return response.status(400).json({
                message : "User not registerd",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)
        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        //access token  &  ref. token
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user.id);

        const updateUser =await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accessToken,cookiesOption);
        response.cookie('refreshToken',refreshToken,cookiesOption);

        return response.json({
            message : "Login Successful",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
    
}

//User Logout controller
export async function logoutController(request,response) {
    try {
        const userid = request.userId; //middleware
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.clearCookie("accessToken",cookiesOption);
        response.clearCookie("refreshToken",cookiesOption);  

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })
        
        return response.json({
            message : "Logout Successful",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//User Avatar Upload Controller
export async function uploadAvatarController(request,response){
    try {
        const userId = request.userId //auth middleware
        const image = request.file //multer middleware

        const upload = await uploadImageCloudinary(image)
        /*console.log("image",image);*/
        const updateAvatar = await UserModel.findByIdAndUpdate(userId, {
            avatar : upload.url
        })

        return response.json({
            message : "Profile Uploaded",
            ///data : upload
            data : {
                _id : userId,
                avatar : upload.url
                
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })        
    }
}

//User Details Update Controller
export async function updateUserDetailsController(request,response) {
    try {
        const userId = request.userId; //auth middleware
        const { name,email,mobile,password } = request.body;

        let hashPassword="";

        if(password){
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password,salt);
        }

        const updateUser = await UserModel.updateOne({_id : userId },{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })

        return response.json({
            message : "Updated User Details Successfylly",
            error : false,
            success : true,
            data : updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })        
    }
}

//Forgot Password Controller (not login)
export async function forgotPasswordController(request,response) {
    try {
        const { email } = request.body;

        if (!email || !email.includes("@")) {
            return response.status(400).json({
                message: "Please provide a valid email",error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        


        const otp = generateOtp();
        const expireTime = new Date(Date.now()+60*60*1000); //1hr

        await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : expireTime.toISOString()
        })

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Forgot Password from QuickeyIt",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message : " Check Your Email",
            error : false,
            success : true
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })        
    }    
}

//forgot password otp verify controller
export async function verifyForgotPasswordOtpController(request,response) {
    try {
        const { email, otp }= request.body;

        if(!email || !otp){
            return response.status(400).json({
                message : "Provide required field email,otp",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        //check otp time expire or not
        const currentTime = new Date();
        if(user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message : "OTP expired",
                error : true,
                success : false
            })
        }

        //check otp database otp are same or not
        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message : "Invalid OTP",
                error : true,
                success : false
            })
        }

        //if OTP is not expired and OTP=== user.forgot_password_otp
        const updateUser=await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })
        return response.json({
            message : "OTP verified",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })        
    }    
}

//Reset Password Controller
export async function resetPasswordController(request,response) {
    try {
        const { email, newPassword, confirmPassword } = request.body;
        
        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "Provide required fields email,newPassword,confirmPassword",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        if(user.password === newPassword){
            return response.status(400).json({
                message : "New password cannot be same as previous password",
                error : true,
                success : false
            })
        }
        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "newPassword and confirmPassword mismatched",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword,salt);

        const update = await UserModel.findByIdAndUpdate(user._id,{
            password : hashPassword
        })

        return response.json({
            message : " Password updated successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })        
    }    
}

//Refresh Token Controller
export async function refreshTokenController(request,response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1];

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid Token",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN);

        if(!verifyToken){
            return response.status(401).json({
                message : "Token is expired",
                error : true,
                success : false
            })
        }

        console.log("verifyToken",verifyToken);
        const userId = verifyToken?._id;

        const newAccessToken = await generateAccessToken(userId);

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption);
        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })
        //console.log("refreshToken",refreshToken);
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }    
}

//Get login user details
export async function userDetailsController(request,response) {
    try {
        const userId = request.userId

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message: 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something Wrong",
            error : true,
            success : false
        })
    }
}