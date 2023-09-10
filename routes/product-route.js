import {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";
import { Router } from "express";
export const router = Router();

//Get all Method
router.get("/", getAllProduct);

//Get by ID Method
router.get("/:id", getOneProduct);

//Create by ID Method
router.post("/", createProduct);

//Update by ID Method
router.patch("/:id", updateProduct);

//Delete by ID Method
router.delete("/:id", deleteProduct);
