const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// API lấy thông tin người dùng
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Tìm người dùng theo ID (được lấy từ token)
    const user = await User.findById(req.user.id).select("-password"); // Không trả mật khẩu về
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin người dùng" });
  }
});

// API sửa thông tin người dùng
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { fullName, email, phone, address } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!fullName || !email || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Cập nhật thông tin người dùng
    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    user.address = address;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Cập nhật thông tin thành công",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Không thể cập nhật thông tin người dùng" });
  }
});

// API thay đổi mật khẩu
router.put("/profile/password", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const { oldPassword, newPassword } = req.body;

    // Kiểm tra mật khẩu cũ và mới có đầy đủ không
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập mật khẩu cũ và mật khẩu mới" });
    }

    // Kiểm tra mật khẩu cũ có đúng không
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu cũ không đúng" });
    }

    // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Cập nhật mật khẩu thành công",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Không thể thay đổi mật khẩu" });
  }
});

module.exports = router;
