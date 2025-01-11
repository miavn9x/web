const express = require("express");
const Product = require("../models/productModel"); // Import model Product
const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Có lỗi khi lấy sản phẩm" });
  }
});

// Lấy chi tiết sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Có lỗi khi lấy thông tin sản phẩm" });
  }
});

module.exports = router;
