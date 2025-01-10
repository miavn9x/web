// src/Pages/Auth/Login/index.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./style.css";

const Login = ({ isModal = false, closeModal, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          if (isModal) {
            closeModal();
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, [navigate, isModal, closeModal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
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
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        localStorage.setItem("userRole", decoded.role);
        onLoginSuccess(decoded.role);

        if (isModal) {
          closeModal();
        } else {
          navigate(decoded.role === "admin" ? "/admin" : "/");
        }
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError("Tên đăng nhập không tồn tại");
            break;
          case 401:
            setError("Mật khẩu không đúng");
            break;
          case 500:
            setError("Có lỗi xảy ra từ server");
            break;
          default:
            setError(err.response.data.message || "Đăng nhập thất bại");
        }
      } else {
        setError("Không thể kết nối đến server");
      }
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
          <a href="/forgot-password">Quên mật khẩu?</a>
          <a href="/register">Đăng ký tài khoản mới</a>
        </div>
      </div>
    </div>
  );
};

export default Login;