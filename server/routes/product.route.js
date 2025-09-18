import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  updateProductDetailsController,
} from "../controllers/product.controllers.js";
import { admin } from "../middleware/admin.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);

//update product
productRouter.put(
  "/update-product-details",
  auth,
  admin,
  updateProductDetailsController
);

//delete product
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);

export default productRouter;
