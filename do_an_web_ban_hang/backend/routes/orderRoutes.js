const express = require("express");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const router = express.Router();

// Route tạo đơn hàng
router.post("/orders", async (req, res) => {
  const { userId, products } = req.body; // userId là ID người mua, products là danh sách sản phẩm (có số lượng từng sản phẩm)

  try {
    // Kiểm tra số lượng sản phẩm trong kho
    const productIds = products.map((product) => product.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    // Kiểm tra xem tất cả sản phẩm đều có trong cơ sở dữ liệu hay không
    if (dbProducts.length !== products.length) {
      return res
        .status(404)
        .json({ message: "Một hoặc nhiều sản phẩm không tồn tại." });
    }

    // Kiểm tra số lượng sản phẩm trong kho
    for (let product of products) {
      const dbProduct = dbProducts.find(
        (item) => item._id.toString() === product.productId
      );

      if (dbProduct.remainingStock < product.quantity) {
        return res.status(400).json({
          message: `Sản phẩm ${dbProduct.name} chỉ còn ${dbProduct.remainingStock} sản phẩm trong kho.`,
        });
      }

      // Cập nhật số lượng còn lại trong kho
      dbProduct.remainingStock -= product.quantity;
      await dbProduct.save();
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      userId,
      products,
      status: "pending", // Trạng thái đơn hàng
    });

    await newOrder.save();

    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công.",
      order: newOrder,
    });
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi tạo đơn hàng." });
  }
});

module.exports = router;
