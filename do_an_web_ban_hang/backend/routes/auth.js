// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Đảm bảo bạn đã tạo mô hình User trong thư mục models
// const router = express.Router();

// // Đăng nhập người dùng
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Thông tin đăng nhập không đúng" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "Thông tin đăng nhập không đúng" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Don't return password to client
//     const userWithoutPassword = { ...user.toObject() };
//     delete userWithoutPassword.password;

//     res.json({ token, user: userWithoutPassword });
//   } catch (err) {
//     res.status(500).json({ message: "Lỗi khi đăng nhập, vui lòng thử lại" });
//   }
// });

// module.exports = router;
