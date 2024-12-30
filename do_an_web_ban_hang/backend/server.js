const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Dữ liệu mẫu (Thay bằng database thực tế như MongoDB hoặc MySQL)
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("123456", 10), // Mật khẩu được mã hóa
    email: "admin@example.com",
  },
];

app.use(cors());
app.use(express.json());

// Secret key cho JWT
const JWT_SECRET = "your_secret_key_here";

// Đăng nhập
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm user theo username
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "Tên đăng nhập không tồn tại" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token hết hạn sau 1 giờ
      }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// Lấy thông tin người dùng (yêu cầu token)
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
});

// Đăng xuất (Chỉ xóa token ở phía client)
app.post("/api/auth/logout", (req, res) => {
  res.status(200).json({ message: "Đăng xuất thành công" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
