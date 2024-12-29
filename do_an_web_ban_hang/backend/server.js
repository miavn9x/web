const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs"); // Thêm bcryptjs để mã hóa mật khẩu

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => {
    console.log("Lỗi kết nối MongoDB:", err);
    process.exit(1); // Dừng server nếu không thể kết nối MongoDB
  });

// Tạo Schema cho User
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// Mã hóa mật khẩu trước khi lưu vào DB
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Mã hóa mật khẩu khi lưu lần đầu hoặc khi thay đổi mật khẩu
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Đăng ký người dùng
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }

    // Tạo người dùng mới và lưu mật khẩu đã mã hóa
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký người dùng thành công" });
  } catch (err) {
    console.log("Lỗi khi đăng ký người dùng:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi đăng ký người dùng, vui lòng thử lại" });
  }
});

// Đăng nhập người dùng
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Thông tin đăng nhập không đúng" });
    }

    // So sánh mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Thông tin đăng nhập không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Trả về token và thông tin người dùng
    res.json({ token, user });
  } catch (err) {
    console.log("Lỗi khi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi khi đăng nhập, vui lòng thử lại" });
  }
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đã chạy trên cổng ${PORT}`));
