import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  orderId: {
    type: String,
    required: [true, "Provide orderId"],
    unique: true
  },
  product_Id: {
    typr: mongoose.Schema.ObjectId,
    ref: 'product'
  },
  product_details: {
    name: String,
    image: Array,
  },
  paymentId: {
    type: String,
    default: ""
  },
  payment_status: {
    type: String,
    default: ""
  },


}, {
  timestamps: true
})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel