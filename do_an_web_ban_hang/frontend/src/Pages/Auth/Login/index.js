// src/Pages/Auth/Login/index.js
import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./style.css";

const Login = ({ isModal = false, closeModal, onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLoginComplete = useCallback(
   (token, role) => {
     localStorage.setItem("token", token);
     localStorage.setItem("userRole", role);

     if (onLoginSuccess) {
       onLoginSuccess(role);
     }

     setTimeout(() => {
       if (isModal) {
         closeModal();
       } else {
         const redirectPath =
           location.state?.from || (role === "admin" ? "/" : "/");
         navigate(redirectPath, { replace: true });
       }
     }, 0);
   },
   [isModal, closeModal, navigate, onLoginSuccess, location]
 );
//
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token } = response.data;
      if (token) {
        const decoded = jwtDecode(token);
        handleLoginComplete(token, decoded.role);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "Không thể kết nối đến server";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (isModal) {
      closeModal();
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`login-container ${isModal ? "modal" : ""}`}>
      <div className="login-content">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h2>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <div className="additional-links">
          <a href="/register">Đăng ký tài khoản mới</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
