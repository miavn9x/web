const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");
const router = express.Router();

// Cấu hình Multer để lưu trữ tạm thời các tệp trong bộ nhớ
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Kiểm tra trùng lặp sản phẩm
const checkDuplicate = async (name, brand, category) => {
  try {
    const existingProduct = await Product.findOne({ name, brand, category });
    return existingProduct; // Nếu có sản phẩm trùng, sẽ trả về sản phẩm đó
  } catch (err) {
    throw new Error("Lỗi kiểm tra trùng lặp");
  }
};

// Route thêm sản phẩm mới với hình ảnh lên Cloudinary
router.post("/products", upload.array("images", 20), async (req, res) => {
  const {
    name,
    category,
    productGroup,
    brand,
    description,
    originalPrice,
    discountPercentage,
    priceAfterDiscount,
    discountCode,
  } = req.body;

  try {
    // Kiểm tra trùng lặp sản phẩm
    const duplicateProduct = await checkDuplicate(name, brand, category);
    if (duplicateProduct) {
      return res.status(400).json({ message: "Sản phẩm này đã tồn tại." });
    }

    // Upload tất cả các hình ảnh lên Cloudinary
    const imageUploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(file.buffer);
      });
    });

    const uploadResults = await Promise.all(imageUploadPromises);
    const images = uploadResults.map((result) => result.secure_url);

    // Tạo mới sản phẩm và lưu vào database
    const newProduct = new Product({
      name,
      category,
      productGroup,
      brand,
      description,
      originalPrice,
      discountPercentage,
      priceAfterDiscount,
      discountCode,
      images,
    });

    await newProduct.save();

    // Trả về thông báo thành công
    res.status(201).json({
      message: "Sản phẩm đã được thêm thành công",
      product: newProduct,
    });
  } catch (err) {
    console.error("Lỗi khi upload hình ảnh hoặc lưu sản phẩm:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm" });
  }
});

// Route lấy danh sách sản phẩm
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách sản phẩm" });
  }
});

module.exports = router;
