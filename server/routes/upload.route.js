import { Router } from "express";
import auth from "../middleware/auth.js";
import { uploadImageContoller } from "../controllers/uploadImage.controllers.js";
import upload from "../middleware/multer.js";

const uploadRouter = Router()

uploadRouter.post("/upload",auth,upload.single("image"),uploadImageContoller)

export default uploadRouter