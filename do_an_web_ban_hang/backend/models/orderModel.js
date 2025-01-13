const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến mô hình User
      required: true, // Bắt buộc phải có userId
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Tham chiếu đến mô hình Product
          required: true, // Bắt buộc phải có productId
        },
        quantity: {
          type: Number,
          required: true, // Bắt buộc phải có số lượng
          min: [1, "Số lượng sản phẩm phải lớn hơn hoặc bằng 1"], // Kiểm tra số lượng
        },
        price: {
          type: Number,
          required: true, // Bắt buộc phải có giá
          min: [0, "Giá sản phẩm phải lớn hơn hoặc bằng 0"], // Kiểm tra giá sản phẩm
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"], // Trạng thái có thể là: pending, completed, cancelled
      default: "pending", // Mặc định là "pending"
    },
    createdAt: {
      type: Date,
      default: Date.now, // Mặc định là thời gian hiện tại
    },
  },
  {
    timestamps: true, // Thêm các trường createdAt và updatedAt tự động
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
