import { Router } from 'express';
import auth from '../middleware/auth.js';
import { addToCartItemController } from '../controllers/cart.controllers.js';

const cartRouter = Router();

cartRouter.post('/create',auth,addToCartItemController)

export default cartRouter 