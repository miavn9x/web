const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary với thông tin đăng nhập của bạn
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Đặt tên cloud của bạn
  api_key: process.env.CLOUDINARY_API_KEY, // Đặt API key của bạn
  api_secret: process.env.CLOUDINARY_API_SECRET, // Đặt API secret của bạn
});

module.exports = cloudinary;
