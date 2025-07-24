import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (request,response)=>{
    try {
        const { name, image, category } = request.body

        if(!name && !image && !category[0]){
            return response.status(400).json({
                message : "Provide Required Data",
                error : true,
                success : false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const alreadyExists = await SubCategoryModel.findOne({
            $or: [{ name }, { image }],
        });
        if (alreadyExists) {
            return response.status(409).json({
                message: "Sub-category with the same name or image already exists",
                error: true,
                success: false,
            });
        }


        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()

        return response.json({
            message : "Sub-category Created",
            data : save,
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

export const getSubCategoryController = async(request,response)=>{
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')
        return response.json({
            message : "Sub Category Data",
            data : data,
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

export const updateSubCategoryController = async (request,response)=>{
    try {
        const { _id, name, image, category }=request.body

        const cheskSub = await SubCategoryModel.findById(_id)

        if(!cheskSub){
            return response.status(400).json({
                message : "Check youtr id",
                error : true,
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return response.json({
            message : "Updated Successfully",
            data : updateSubCategory,
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