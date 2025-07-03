import { response } from "express"

export const uploadImageContoller=async(request,response)=>{
    try {
        const file = request.file
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}