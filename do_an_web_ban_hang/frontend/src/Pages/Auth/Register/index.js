import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = ({ closeModal, onRegisterSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    username: "",
    password: "",
    role: "user", // Thêm role mặc định là user
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }

    // Sửa lại validation số điện thoại
    const phoneNumber = formData.phone.replace(/\s+/g, ""); // Xóa khoảng trắng
    // Kiểm tra độ dài từ 10-14 số và chỉ chứa số
    const phoneRegex = /^[0-9]{10,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Số điện thoại phải có từ 10 đến 14 số");
      return false;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    return true;
  };

  // Thêm xử lý format số điện thoại khi nhập
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Chỉ cho phép nhập số và khoảng trắng
      const formattedValue = value.replace(/[^\d\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError(null);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data.user) {
        if (onRegisterSuccess) {
          onRegisterSuccess("Đăng ký thành công!");
        }

        // Clear form
        setFormData({
          fullName: "",
          phone: "",
          address: "",
          email: "",
          username: "",
          password: "",
          role: "user",
        });

        if (closeModal) {
          closeModal();
          if (switchToLogin) switchToLogin();
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <h2>Đăng ký</h2>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div className="input-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
          <div className="input-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </div>
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
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <button
          type="button"
          onClick={switchToLogin || (() => navigate("/login"))}
          className="switch-login-link"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Register;
