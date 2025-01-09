// src/Pages/Auth/Login/index.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Register from "../Register"; // Import Register
import { jwtDecode } from "jwt-decode"; // Sửa cách import

const Login = ({ closeModal, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Giữ nó ở đây để quản lý chuyển đổi giữa Login và Register

  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Kiểm tra token khi trang login được truy cập
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Nếu đã đăng nhập, điều hướng người dùng đến trang chủ
      navigate("/");
      if (closeModal) closeModal(); // Đảm bảo đóng modal nếu đã đăng nhập
    }
  }, [navigate, closeModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closeModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    if (closeModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (closeModal) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage(response.data.message);
      setError(null);
      const token = response.data.token;
      localStorage.setItem("token", token); // Lưu token vào localStorage

      const decodedToken = jwtDecode(token); // Giải mã token
      if (onLoginSuccess) {
        onLoginSuccess(decodedToken?.role || "");
      }

      navigate("/"); // Điều hướng tới trang chủ
      if (closeModal) {
        closeModal(); // Đóng modal nếu đang ở dạng modal
      }
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const switchToRegister = () => {
    setIsRegistering(true); // Chuyển sang trang đăng ký
  };

  const switchToLogin = () => {
    setIsRegistering(false); // Quay lại trang đăng nhập
  };

  if (isRegistering) {
    return (
      <Register
        closeModal={closeModal}
        onRegisterSuccess={switchToLogin} // Khi đăng ký thành công, quay lại đăng nhập
        switchToLogin={switchToLogin} // Truyền thêm prop này để chuyển đổi quay lại đăng nhập
      />
    );
  }

  // Xác định kiểu giao diện dựa trên việc có nhận được các prop modal hay không
  const containerClass = closeModal
    ? "login-container"
    : "login-page-container";
  const formClass = closeModal ? "login-form" : "login-page-form";

  return (
    <div className={containerClass}>
      <div className={formClass} ref={modalRef}>
        {closeModal && (
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        )}
        <h2>Đăng nhập</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <Button type="submit" className="btn-submit">
            Đăng nhập
          </Button>
        </form>
        <div className="switch-link">
          <p>
            Chưa có tài khoản?{" "}
            <span onClick={switchToRegister} className="link">
              Đăng ký ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
