import { createOrder } from "../controllers/order-controller.js";
import { Router } from "express";
export const router = Router();


//Create by ID Method
router.post("/", createOrder);
