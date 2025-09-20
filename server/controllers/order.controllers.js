import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import AddressModel from "../models/address.model.js";
import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";
import CartProductModel from "../models/cartProduct.js";

export async function CashOnDeliveryOrderController(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        paymentId: " ",
        payment_status: "CASH_ON_DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generateOrder = await OrderModel.insertMany(payload);

    //update product stock
    list_items.forEach(async (el) => {
      await ProductModel.findByIdAndUpdate(
        { _id: el.productId._id },
        { $inc: { stock: -el.quantity } },
        { new: true }
      );
    });

    //remove from the cart
    const removeCartItems = await CartProductModel.deleteMany({
      userId: userId,
    });
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    return response.json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: generateOrder,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}
