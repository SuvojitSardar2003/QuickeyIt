import jwt from 'jsonwebtoken';

const auth = async (request,response,next)=>{
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1];
        console.log(token);

        if (!token) {
            return response.status(401).json({
                message: "Unauthorized. No token provided.",
                error: true,
                success: false
            });
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log(decode);

        if(!decode){
            return response.status(401).json({
                message : " Unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id;
        
        next();
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default auth