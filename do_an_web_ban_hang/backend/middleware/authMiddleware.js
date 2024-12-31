const jwt = require("jwt-simple");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware kiểm tra quyền admin
const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Quyền truy cập bị từ chối" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = { adminMiddleware };
