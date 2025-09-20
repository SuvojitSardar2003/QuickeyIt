import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemQtyController);
cartRouter.delete("/delete-qty", auth, deleteCartItemQtyController);

export default cartRouter;
