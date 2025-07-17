const productModel = require("../models/products.model");

const productControls = {
  getProduct: async (req, res) => {
    try {
      const products = await productModel.find();
      if (!products)
        return res.status(400).json({ status: false, msg: "No product found" });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        productId,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res
          .status(400)
          .json({ status: false, msg: "No image uploaded" });
      const newProduct = new productModel({
        productId,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      res.status(200).json({ status: true, msg: "Product added successfully" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      await productModel.findByIdAndDelete(id);
      res
        .status(200)
        .json({ status: true, msg: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images)
        return res
          .status(400)
          .json({ status: false, msg: "No image uploaded" });
      const id = req.params.id;
      await productModel.findOneAndUpdate(
        { _id: id },
        { title, price, description, content, images, category }
      );
      res.status(200).json({ status: true, msg: "Product updated" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
};

module.exports = productControls;
