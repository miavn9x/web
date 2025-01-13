const mongoose = require("mongoose");

// Kiểm tra xem model 'User' đã được định nghĩa hay chưa
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: "user" }, // Phân quyền: 'user' hoặc 'admin'
});

// Nếu model 'User' đã được định nghĩa, trả về model đó, nếu chưa thì định nghĩa
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
