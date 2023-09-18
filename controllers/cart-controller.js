import { CartModel } from "../models/cart-model.js";
import { userModel } from "../models/user-model.js";
import { ProductModel } from "../models/product-model.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  // console.log(userId,productId);
  try {
    const cartItems = await CartModel.findOne({
      user: userId,
    });
    // console.log(cartItems);
    //-----Get Selected Product Details ----
    const productDetails = await ProductModel.find({ _id: productId });
    // console.log(productDetails)
    if (!productDetails) {
      return res.status(500).json({
        type: "Product Not Found",
        msg: "Invalid request",
      });
    } else if (!cartItems) {
      let addProdutToCart = {};
      productDetails.forEach(async (item) => {
        item.stock -= 1;
        await item.save();
        addProdutToCart = await CartModel.create({
          user: userId,
          items: [{ product: item, quantity: 1, total: 1 }],
        });
      });

      // console.log(addProdutToCart.items);
      return res.status(201).send({
        message: "You create new cart & The product added succesfully",
        data: addProdutToCart,
      });
    } else {
      productDetails.forEach(async (item) => {
        item.stock -= 1;
        await item.save();
        console.log(cartItems.items.some((ele) => ele.product.equals(item._id)));
        if (!cartItems.items.some((ele) => ele.product.equals(item._id))) {
          await CartModel.updateOne(
            { user: userId },
            { $push: { items: { product: item, quantity: 1, total: 1 } } }
          );
        } else {
          const productIndex = cartItems.items.findIndex((ele) => ele.product.equals(item._id));
          const key = `items.${productIndex}.quantity`;
          const newItem = await CartModel.findOneAndUpdate(
            { user: userId, "items.product": item._id },
            {$set: {[`items.${productIndex}.quantity`]:  cartItems.items[productIndex].quantity + 1}}
          );
        }
      });
      cartItems.quantity += 1;
      await cartItems.save();
      return res.status(201).send({
        message: "You add quantity to the products already exists",
        data: cartItems,
      });
      //   item.stock -= 1;
      //   await item.save();
      // });
      // await productDetails.save();
      // cartItems.detailsProduct.quantity += 1;
      // productDetails.stock -= 1;
      // await cartItems.save();
      // await productDetails.save();
      // return res.status(201).send({
      //   message: "You add quantity to the products already exists",
      //   data: cartItems,
      // });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const data = await CartModel.find()
      .populate({
        path: "items",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate({
        path: "user",
        select: "name email phoneNumber address",
        model: "users",
      });
    // .exec();
    return res.json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There is no product added to cart", error: error });
  }
};
