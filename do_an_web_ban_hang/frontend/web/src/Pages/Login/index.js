import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { MdLogin, MdHowToReg } from "react-icons/md";
import "./style.css"; // Đảm bảo bạn đã định nghĩa style cho class này

const LoginRegister = ({ setUser, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle giữa đăng nhập và đăng ký
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý gửi form đăng nhập/đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (isLogin) {
        // Đăng nhập
        res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      } else {
        // Đăng ký
        await axios.post("http://localhost:5000/api/auth/register", formData);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsLogin(true); // Chuyển về chế độ đăng nhập sau khi đăng ký thành công
      }

      // Reset form sau khi thao tác thành công
      setFormData({ email: "", password: "", name: "" });
      setError(""); // Reset lỗi nếu có
      closeModal(); // Đóng modal sau khi thành công
    } catch (err) {
      setError(
        isLogin
          ? "Đăng nhập thất bại, vui lòng kiểm tra thông tin!"
          : "Đăng ký thất bại, vui lòng thử lại."
      );
    }
  };

  return (
    <div className="login-modal">
      <Typography variant="h4" className="login__title" gutterBottom>
        {isLogin ? <MdLogin /> : <MdHowToReg />}{" "}
        {isLogin ? "Đăng Nhập" : "Đăng Ký"}
      </Typography>
      <form onSubmit={handleSubmit} className="login__form">
        {!isLogin && (
          <div className="login__field">
            <FaUserAlt className="login__icon" />
            <TextField
              label="Họ và Tên"
              name="name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="login__field">
          <FaUserAlt className="login__icon" />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__field">
          <FaLock className="login__icon" />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <Typography color="error" className="login__error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="login__button"
        >
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </Button>
      </form>
      <Typography
        className="toggle-auth"
        onClick={() => setIsLogin(!isLogin)} // Toggle giữa Đăng Nhập và Đăng Ký
      >
        {isLogin
          ? "Chưa có tài khoản? Đăng ký ngay!"
          : "Đã có tài khoản? Đăng nhập tại đây."}
      </Typography>
    </div>
  );
};

export default LoginRegister;
