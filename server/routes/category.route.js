import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController } from "../controllers/category.controllers.js";


const categoryRouter = Router();

categoryRouter.post("/add-category",auth,AddCategoryController)

export default categoryRouter