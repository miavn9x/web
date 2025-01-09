// Import các thư viện cần thiết
const express = require("express");
const cors = require("cors");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Cấu hình từ file .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Kết nối đến MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Kết nối thành công"))
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

// Middleware kiểm tra quyền
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
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

// API yêu cầu quyền admin
app.get("/api/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Chào mừng admin", user: req.user });
});

// API yêu cầu người dùng đã đăng nhập
app.get("/api/user", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Chào mừng người dùng", user: req.user });
});

// Đăng xuất (thực tế chỉ là xóa token ở phía client)
app.post("/api/auth/logout", (req, res) => {
  res.status(200).json({ message: "Đăng xuất thành công" });
});



// Import product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

// Lắng nghe trên cổng được chỉ định
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
