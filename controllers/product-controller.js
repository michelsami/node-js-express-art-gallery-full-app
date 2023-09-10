import { ProductModel } from "../models/product-model.js";

export const getAllProduct = async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const data = await ProductModel.findById(req.params.id);
    // if (!data) {
    //   return res
    //     .status(400)
    //     .json({ message: "There is no activity with that id." });
    // }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "There is no activity with that id." });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock, image, category } = req.body;
  const date = new Date();
  try {
    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      stock,
      image,
      category,
      created_at: date,
    });

    return res
      .status(200)
      .json({ message: "Data add successfully", data: newProduct });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, category, description, image, stock, price } = req.body;

  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        category,
        description,
        image,
        stock,
        price,
        created_at: new Date(),
      },
      { new: true }
    );
    if (!updateProduct) {
      return res
        .status(400)
        .json({ message: "There is no activity with that id." });
    }
    return res
      .status(200)
      .json({ message: "Data Updated successfully", data: updateProduct });
  } catch (error) {
    console.log(`Error while updating activity : ${error}`);
    return res.status(400).json({ message: error });
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    await ProductModel.findByIdAndRemove(productId);
    return res
      .status(200)
      .json({ message: "The product deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
