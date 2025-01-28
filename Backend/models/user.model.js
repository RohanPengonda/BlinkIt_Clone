import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide Name"]

  },
  email: {
    type: String,
    required: [true, "Provide Email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Provide Password"],
  },
  avatar: {
    type: String,
    default: ""
  },
  mobile: {
    type: Number,
    default: ""
  },
  refresh_token: {
    type: String,
    default: ""
  },
  verify_email: {
    type: Boolean,
    default: false
  },
  last_login_date: {
    type: date,
    default: ""
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active"
  },
  address_details: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'address'
    }
  ],
  shopping_cart: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'cartProduct'
    }
  ],

  order_History: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'order'
    }
  ],

  forget_Password_Otp: {
    type: String,
    default: null
  },
  forget_Password_Expiry: {
    type: Date,
    default: ""
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: "USER"
  }

}, {
  timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel