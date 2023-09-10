import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = mongoose.Schema;
const validatorPackage = require("validator");
// const Validator = require('validatorjs');

const OrderSchema = new Schema(
  {
    ordernumber: {
      ref: User,
      required: true,
    },
    customeremail: {
      type: String,
      unique: true,
      required: [true, "Email address is required"],
      validate: {
        validator: validatorPackage.isEmail,
        message: "Please provide a valid email",
      },
    },
    customerphone: {
      type: Number,
      required: false,
      default: 0,
    },
    customeraddress: { type: String, required: true },
    orderstatus: {
      type: Boolean,
      default: false,
    },
    orderdate: String,
    orderitems: { type: String, required: false },
    productname: { type: String, required: true },
    productprice: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    productquantity: { type: Number },
    productsubtotal: { type: Number },
    ordertotal: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);


