const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/productModel");
const Favorite = require("../models/favoriteModel");
const router = express.Router();




// Route thêm sản phẩm vào yêu thích
router.post("/favorites", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    // Kiểm tra sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    // Kiểm tra người dùng đã có sản phẩm yêu thích chưa
    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      favorite = new Favorite({ user: userId, products: [productId] });
      await favorite.save();
    } else {
      if (!favorite.products.includes(productId)) {
        favorite.products.push(productId);
        await favorite.save();
      } else {
        return res.status(400).json({ message: "Sản phẩm đã có trong yêu thích." });
      }
    }

    res.status(200).json({ message: "Sản phẩm đã được thêm vào yêu thích." });
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm vào yêu thích:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm vào yêu thích." });
  }
});

module.exports = router;


// Kiểm tra lại route thêm vào yêu thích
router.post("/favorites", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    // Kiểm tra sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    // Kiểm tra người dùng có mục yêu thích chưa
    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      favorite = new Favorite({ user: userId, products: [productId] });
      await favorite.save();
    } else {
      if (!favorite.products.includes(productId)) {
        favorite.products.push(productId);
        await favorite.save();
      } else {
        return res.status(400).json({ message: "Sản phẩm đã có trong yêu thích." });
      }
    }

    res.status(200).json({ message: "Sản phẩm đã được thêm vào yêu thích." });
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm vào yêu thích:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm vào yêu thích." });
  }
});


// Route xóa sản phẩm khỏi mục yêu thích
router.delete("/favorites/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    // Kiểm tra xem người dùng đã có mục yêu thích chưa
    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      return res.status(404).json({ message: "Mục yêu thích không tồn tại." });
    }

    // Kiểm tra xem sản phẩm có trong mục yêu thích không
    const productIndex = favorite.products.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({ message: "Sản phẩm không có trong yêu thích." });
    }

    // Xóa sản phẩm khỏi mục yêu thích
    favorite.products.splice(productIndex, 1);
    await favorite.save();

    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi yêu thích." });
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm khỏi yêu thích:", err);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi xóa sản phẩm khỏi yêu thích." });
  }
});

// Route lấy danh sách sản phẩm yêu thích
router.get("/favorites", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    // Lấy danh sách sản phẩm yêu thích của người dùng
    const favorite = await Favorite.findOne({ user: userId }).populate(
      "products"
    );

    if (!favorite) {
      return res
        .status(404)
        .json({ message: "Mục yêu thích chưa có sản phẩm." });
    }

    res.status(200).json({
      favorites: favorite.products,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách yêu thích:", err);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách yêu thích." });
  }
});

module.exports = router;
