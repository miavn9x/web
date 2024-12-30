import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./style.css";

const Login = ({ closeModal, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const modalRef = useRef(null); // Ref để xác định vùng của modal

  // Kiểm tra nếu đã có token trong localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Xử lý đóng modal khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Đóng modal nếu click bên ngoài
      }
    };

    // Thêm sự kiện lắng nghe click
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Xóa lỗi trước đó nếu có

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage(response.data.message);

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      // Cập nhật trạng thái đăng nhập
      setIsLoggedIn(true);

      // Điều hướng đến trang chủ hoặc trang khác
      navigate("/");

      // Đóng modal nếu có
      closeModal();

      // Gọi callback để thông báo đăng nhập thành công
      onLoginSuccess("Đăng nhập thành công!");
    } catch (err) {
      // Xử lý lỗi khi đăng nhập thất bại
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");

    // Cập nhật trạng thái đăng xuất
    setIsLoggedIn(false);

    // Điều hướng về trang chủ
    navigate("/");

    // Đóng modal khi cần thiết
    closeModal();
  };

  return (
    <div className="login-container">
      <div className="login-form" ref={modalRef}>
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        {!isLoggedIn ? (
          <>
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
              <button type="submit" className="btn-submit">
                Đăng nhập
              </button>
            </form>
          </>
        ) : (
          <div>
            <h3>Chào mừng bạn đã đăng nhập!</h3>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
