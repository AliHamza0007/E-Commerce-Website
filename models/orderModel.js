import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    username: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    cartItems: [
      { product: String, price: Number, name: String, quantity: Number,size:String,color:String },
    ],
  },
  { timestamps: true }
);
export const OrderModel = mongoose.model("orders", OrderSchema);
