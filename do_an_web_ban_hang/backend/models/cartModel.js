const mongoose = require("mongoose");

// Schema cho một mục trong giỏ hàng
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Tham chiếu đến model "Product"
      required: [true, "Sản phẩm là bắt buộc"], // Thông báo lỗi khi không có sản phẩm
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng là bắt buộc"], // Thông báo lỗi khi không có số lượng
      min: [1, "Số lượng phải lớn hơn hoặc bằng 1"], // Ràng buộc số lượng tối thiểu
      default: 1, // Giá trị mặc định là 1
    },
  },
  { _id: false } // Không cần tạo `_id` riêng cho từng mục trong `items`
);

// Schema cho giỏ hàng
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model "User"
      required: [true, "Người dùng là bắt buộc"], // Thông báo lỗi khi không có người dùng
    },
    items: {
      type: [cartItemSchema], // Sử dụng schema của từng mục giỏ hàng
      required: [true, "Giỏ hàng không thể trống"], // Thông báo lỗi khi giỏ hàng rỗng
      validate: {
        validator: function (items) {
          return items.length > 0; // Đảm bảo giỏ hàng có ít nhất 1 sản phẩm
        },
        message: "Giỏ hàng không thể trống", // Thông báo lỗi nếu vi phạm
      },
    },
  },
  { timestamps: true } // Tự động thêm các trường `createdAt` và `updatedAt`
);

// Tạo model từ schema
const Cart = mongoose.model("Cart", cartSchema);

// Xuất model
module.exports = Cart;
