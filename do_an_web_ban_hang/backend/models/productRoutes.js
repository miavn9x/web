// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product"); // Import model Product

// // GET /api/products - Lấy danh sách tất cả sản phẩm với phân trang
// router.get("/", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Trang hiện tại
//     const limit = parseInt(req.query.limit) || 16; // Số sản phẩm trên mỗi trang

//     const startIndex = (page - 1) * limit;

//     // Đếm tổng số sản phẩm
//     const total = await Product.countDocuments();

//     // Lấy sản phẩm theo trang
//     const products = await Product.find()
//       .skip(startIndex)
//       .limit(limit)
//       .select("-reviews"); // Không lấy field reviews để giảm dung lượng

//     const totalPages = Math.ceil(total / limit);

//     res.json({
//       products,
//       totalPages,
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// });

// // GET /api/products/:id - Lấy chi tiết một sản phẩm
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// });

// // GET /api/products/category/:category - Lấy sản phẩm theo category
// router.get("/category/:category", async (req, res) => {
//   try {
//     const products = await Product.find({ category: req.params.category });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// });

// // GET /api/products/search - Tìm kiếm sản phẩm
// router.get("/search", async (req, res) => {
//   try {
//     const searchQuery = req.query.q;
//     const products = await Product.find({
//       $or: [
//         { name: { $regex: searchQuery, $options: "i" } },
//         { brand: { $regex: searchQuery, $options: "i" } },
//       ],
//     });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// });

// module.exports = router;
