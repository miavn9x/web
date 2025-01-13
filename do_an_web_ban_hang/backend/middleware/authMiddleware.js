const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Lấy secret từ file .env

// Middleware kiểm tra token
const authMiddleware = (req, res, next) => {
  // Lấy token từ header Authorization (kiểu Bearer <token>)
  const token = req.header("Authorization")?.split(" ")[1];

  // Kiểm tra xem token có tồn tại hay không
  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    // Xác minh token và giải mã thông tin người dùng
    const decoded = jwt.verify(token, JWT_SECRET);

    // Lưu thông tin người dùng vào req.user
    req.user = decoded;

    // Tiếp tục xử lý tiếp theo
    next();
  } catch (err) {
    // Trường hợp token không hợp lệ hoặc đã hết hạn
    console.error(err); // Ghi lại lỗi nếu có
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = authMiddleware;
