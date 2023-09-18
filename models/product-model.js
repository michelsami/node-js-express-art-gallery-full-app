import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: {
      type: String,
      required: [true, "A product must have a description."],
    },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    price: {
      type: Number,
      trim: true,
      required: [true, "A product must have a price."],
    },
    created_at: { type: Date },
    // updated_at:{ type: Date, default: Date.now },
    // updated:{type: Date, default: Date.now}
  }

  // { timestamps: true },
  // { versionKey: false },
  // { strict: false }
);
export const ProductModel = mongoose.model("Product", productSchema);
