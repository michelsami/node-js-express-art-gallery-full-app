import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = mongoose.Schema;


const orderSchema = new Schema(
  {
    // user: new Schema({
    //   _id: Schema.Types.ObjectId,
    //   name: String,
    //   references: [{ type: Schema.Types.Mixed }]
    // }),
    // order: [CartModel.cartSchema],
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user: { type: Schema.Types.ObjectId, ref: "users" },
    detailsProduct: {
      quantity: { type: Number, default: 1 },
      subTotal: { type: Number },
    },
    status: {
      type: String,
      enum: ["on-delivered", "delivered"],
      default: "on-delivered",
    },
    totalPrice: { type: Number, default: 0, required: true },
    eta: {
      type: Number,
      default: function () {
        return Math.floor(Math.random() * (25 - 5 + 1) + 5);
      },
    },
    // }, {
    //   toJSON: {
    //     transform: function (doc, ret) {
    //       ret.userData = {name: ret.user}
    //     }
    //   }
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Order", orderSchema);
