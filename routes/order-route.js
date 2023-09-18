import {
  shippingOrder,
  getOrderById,
  getAllOrders,
} from "../controllers/order-controller.js";
import { Router } from "express";
export const router = Router();

//Create by ID Method
router.post("/", shippingOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
