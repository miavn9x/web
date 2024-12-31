const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên sản phẩm
  category: { type: String, required: true }, // Chủng loại (thịt, cá, rau, gia vị,...)
  productGroup: { type: String, required: true }, // Nhóm sản phẩm
  brand: { type: String, required: true }, // Thương hiệu
  description: { type: String, required: true }, // Mô tả chi tiết
  images: [
    {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Kiểm tra xem có phải URL hợp lệ hoặc là đường dẫn của ảnh
          return (
            /^(http|https):\/\/[^ "]+$/.test(value) ||
            /\.(jpg|jpeg|png|gif)$/.test(value)
          );
        },
        message: (props) =>
          `${props.value} is not a valid image URL or file path!`,
      },
    },
  ], // Danh sách ảnh sản phẩm (URL hoặc Cloudinary URL)
  originalPrice: { type: Number, required: true }, // Giá gốc
  discountPercentage: { type: Number, default: 0 }, // Phần trăm giảm giá
  priceAfterDiscount: { type: Number, required: true }, // Giá sau khi giảm
  discountCode: { type: String }, // Mã giảm giá
  rating: { type: Number, min: 1, max: 5, default: 5 }, // Đánh giá
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Id người dùng đã đánh giá
      reviewText: { type: String }, // Nội dung nhận xét
      rating: { type: Number, min: 1, max: 5 }, // Đánh giá sao
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
