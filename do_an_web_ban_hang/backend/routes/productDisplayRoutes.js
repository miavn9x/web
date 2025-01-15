const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

// GET tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({
      success: false,
      message: "Không thể tải danh sách sản phẩm",
    });
  }
});

// 2. Lấy danh sách sản phẩm theo chủng loại (category) - Tìm kiếm không phân biệt chữ hoa chữ thường
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (!products.length) {
      return res.status(200).json({
        success: true,
        message: `No products found for category: ${category}`,
        products,
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm theo chủng loại ${category}:`, error);
    res.status(500).json({
      success: false,
      message: `Lấy sản phẩm theo chủng loại ${category} thất bại`,
    });
  }
});

// 3. Lấy danh sách sản phẩm đang giảm giá
router.get("/discounted", async (req, res) => {
  try {
    const products = await Product.find({ discountPercentage: { $gt: 0 } });
    if (!products.length) {
      return res.status(200).json({
        success: true,
        message: "No discounted products found",
        products,
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
    res.status(500).json({
      success: false,
      message: "Lấy sản phẩm giảm giá thất bại",
    });
  }
});

module.exports = router;
