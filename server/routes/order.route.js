import { Router } from "express";
import auth from "../middleware/auth.js";
import { CashOnDeliveryOrderController, paymentController, webhookStripe } from "../controllers/order.controllers.js";

const orderRouter = Router();

// Define your order-related routes here
orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.post("/checkout",auth,paymentController)
orderRouter.post("/webhook",webhookStripe)

export default orderRouter;
