// src/Pages/Auth/Register/index.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import để điều hướng
import "./style.css";

const Register = ({ closeModal, onRegisterSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);

  const navigate = useNavigate(); // Sử dụng để điều hướng nếu không có `switchToLogin`

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closeModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal(); // Close modal if click outside
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
    setError(null); // Reset previous errors
    setMessage(""); // Reset previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      setMessage(response.data.message);
      setError(null);
      onRegisterSuccess("Đăng ký thành công!"); // Truyền thông báo lên cha

      // Nếu đang ở modal, đóng modal sau khi đăng ký thành công
      if (closeModal) {
        closeModal();
      } else {
        // Nếu ở trang riêng, điều hướng về trang đăng nhập
        navigate("/login");
      }
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  const handleSwitchToLogin = () => {
    if (switchToLogin) {
      switchToLogin(); // Chuyển sang đăng nhập từ modal
    } else {
      navigate("/login"); // Điều hướng về trang đăng nhập nếu ở trang riêng biệt
    }
  };

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
        <h2>Đăng ký</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

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
              type="text"
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
            />
          </div>
          <button type="submit" className="btn-submit">
            Đăng ký
          </button>
        </form>

        <button
          type="button"
          onClick={handleSwitchToLogin} // Sử dụng hàm mới để chuyển đổi
          className="switch-login-link"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Register;
