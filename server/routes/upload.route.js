import { Router } from "express";
import auth from "../middleware/auth.js";
import { uploadImageContoller } from "../controllers/uploadImage.controllers.js";

const uploadRouter = Router()

uploadRouter.post("/upload",auth,uploadImageContoller)

export default uploadRouter