import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: String, required: true },
    price: { type: Number, trim: true, required: [true, "Price is required"] },
    created_at:{ type: Date },
    // updated_at:{ type: Date, default: Date.now },
    // updated:{type: Date, default: Date.now}
  },

  // { timestamps: true },
  // { versionKey: false },
  // { strict: false }
);
export const ProductModel = mongoose.model("Product", productSchema);


