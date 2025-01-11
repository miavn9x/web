const express = require("express");
const Product = require("../models/productModel"); // Import model Product
const router = express.Router();

// API thêm sản phẩm mới (không upload ảnh)
router.post("/", async (req, res) => {
  const {
    name,
    category,
    brand,
    description,
    originalPrice,
    discountPercentage,
    priceAfterDiscount,
    discountCode,
    rating,
    reviews,
    images,
  } = req.body;

  // Kiểm tra xem các trường dữ liệu có hợp lệ không
  if (
    !name ||
    !category ||
    !brand ||
    !description ||
    !images ||
    !originalPrice ||
    !priceAfterDiscount
  ) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm" });
  }

  // Kiểm tra tính hợp lệ của các URL hình ảnh
  const validImageUrls = images.every((url) =>
    /^(http|https):\/\/[^ "]+$/.test(url)
  );
  if (!validImageUrls) {
    return res
      .status(400)
      .json({ message: "Một hoặc nhiều URL ảnh không hợp lệ" });
  }

  const newProduct = new Product({
    name,
    category,
    brand,
    description,
    images, // Chỉ lưu URL ảnh mà không upload
    originalPrice,
    discountPercentage,
    priceAfterDiscount,
    discountCode,
    rating,
    reviews,
  });

  try {
    await newProduct.save(); // Lưu sản phẩm vào MongoDB
    res.status(201).json({
      message: "Thêm sản phẩm thành công",
      product: newProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi thêm sản phẩm", error: err.message });
  }
});

module.exports = router;
