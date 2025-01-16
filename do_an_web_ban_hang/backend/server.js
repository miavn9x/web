// Import các thư viện cần thiết
const express = require("express");
const cors = require("cors");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Cấu hình từ file .env
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Kết nối đến MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Kết nối thành công đến MongoDB"))
  .catch((err) => {
    console.error("Có lỗi khi kết nối: ", err);
    process.exit(1);
  });

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// Định nghĩa Schema và Model cho User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: "user" }, // Phân quyền: 'user' hoặc 'admin'
});

const User = mongoose.model("User", userSchema);

// Middleware kiểm tra token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET); // Giải mã token
    req.user = decoded; // Gắn thông tin người dùng vào request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// Middleware kiểm tra quyền admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Quyền truy cập bị từ chối" });
  }
  next();
};

// API Đăng ký
app.post("/api/auth/register", async (req, res) => {
  const { fullName, phone, address, email, username, password, role } =
    req.body;

  if (!fullName || !phone || !address || !email || !username || !password) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: "Tài khoản hoặc email đã tồn tại" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    fullName,
    phone,
    address,
    role: role || "user",
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// API Đăng nhập
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Tên đăng nhập không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    const payload = { id: user._id, username: user.username, role: user.role };
    const token = jwt.encode(payload, JWT_SECRET);

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// API yêu cầu quyền admin
app.get("/api/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Chào mừng admin", user: req.user });
});

// API yêu cầu người dùng đã đăng nhập
app.get("/api/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Chào mừng người dùng", user: req.user });
});

// API lấy toàn bộ dữ liệu người dùng
app.get("/api/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng từ MongoDB
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy dữ liệu người dùng" });
  }
});

// API sửa và  cập nhật thông tin người dùng
app.put("/api/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Không thể cập nhật người dùng" });
  }
});

// API xóa người dùng
app.delete(
  "/api/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id); // Xóa trực tiếp theo ID
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa người dùng:", err);
      res.status(500).json({ message: "Không thể xóa người dùng" });
    }
  }
);

// Import product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api", orderRoutes);



const userRoutes = require("./routes/userRoutes");
// Sử dụng các route liên quan đến người dùng
app.use("/api/user", userRoutes);

const favoritesRoutes = require("./routes/favoritesRoutes"); // import thêm mục yêu thích
app.use("/api", favoritesRoutes); 

const productDisplayRoutes = require("./routes/productDisplayRoutes"); // Đường dẫn cần phù hợp
app.use("/api/products", productDisplayRoutes);

// // cart
// const cartRoutes = require("./routes/cartRoutes"); // Import cart.js
// // Sử dụng router cho giỏ hàng
// app.use("/api/cart", cartRoutes);



// // Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});


// const PORT = process.env.PORT || 5001; // Đổi sang 5001
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
