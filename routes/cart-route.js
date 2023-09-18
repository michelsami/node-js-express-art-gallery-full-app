import { addToCart,getAllCarts } from "../controllers/cart-controller.js";
import { Router } from "express";
export const router = Router();

//Create by ID Method
router.post("/", addToCart);

//Get all Method
router.get("/", getAllCarts);

//Get by ID Method
// router.get("/:id", getOneCart);

//Create by ID Method
// router.post("/", addToCart);

//Update by ID Method
// router.patch("/:id", updateCart);

//Delete by ID Method
// router.delete("/:id", deleteCart);
