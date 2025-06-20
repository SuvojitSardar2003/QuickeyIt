import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplete.js";
import sendEmail from "../config/sendEmail.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

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