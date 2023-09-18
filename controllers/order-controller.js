import { OrderModel } from "../models/order-model.js";
import { CartModel } from "../models/cart-model.js";

export const shippingOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const orderInShipping = await CartModel.findById(orderId);
    if (orderInShipping) {
      return res.status(200).json({
        message: "Order in shipping",
        data: { orderInShipping },
      });
    }
    return res.status(500).json({ message: "Your shopping cart empty" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const data = await OrderModel.find()
      .populate({
        path: "products",
        select: "name price",
        model: "Product",
      })
      .populate({
        path: "user",
        select: "name email phoneNumber address",
        model: "users",
      });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There is no order", error: error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const data = await OrderModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "There is no order with that id." });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await CartModel.findByIdAndRemove(req.params.id);
    return res.status(201).json({ message: "You remove the order succefully" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
