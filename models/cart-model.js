import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
      required: true,
      default:1,
      min: [1, "Quantity can not be less then 1."],
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const ItemModel = mongoose.model("Item", itemSchema);

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    items: [itemSchema],
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Quantity can not be less then 1."],
    },
    totalPrice: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model("Cart", cartSchema);
