// import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

export async function CashOnDeliveryOrderController(request, response) {
  try {
    const userId = request.userId // auth middleware 
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body

    const payload = list_items.map(el => {
      return ({
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      })
    })

    const generatedOrder = await OrderModel.insertMany(payload)

    ///remove from the cart
    const removeCartItems = await CartProductModel.deleteMany({ userId: userId })
    const updateInUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] })

    return response.json({
      message: "Order successfully",
      error: false,
      success: true,
      data: generatedOrder
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
