import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Register from "../Register";
import { jwtDecode } from "jwt-decode"; // Use named import

const Login = ({ closeModal, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userRole, setUserRole] = useState(""); // Thêm state để lưu role người dùng

  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Giải mã token
      setUserRole(decodedToken?.role || ""); // Lưu role vào state
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

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
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage(response.data.message);
      const token = response.data.token;
      localStorage.setItem("token", token); // Lưu token vào localStorage

      const decodedToken = jwtDecode(token); // Giải mã token
      setUserRole(decodedToken?.role || ""); // Lưu role vào state
      setIsLoggedIn(true);

      navigate("/"); // Điều hướng tới trang chủ sau khi đăng nhập
      closeModal();
      onLoginSuccess("Đăng nhập thành công!");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(""); // Reset role khi logout
    navigate("/");
    closeModal();
  };

  const switchToRegister = () => {
    setIsRegistering(true); // Chuyển sang trang đăng ký
  };

  const switchToLogin = () => {
    setIsRegistering(false); // Quay lại trang đăng nhập
  };

  return (
    <div className="login-container">
      <div className="login-form" ref={modalRef}>
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        {!isLoggedIn ? (
          <>
            {!isRegistering ? (
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
                <div className="switch-link">
                  <p>
                    Chưa có tài khoản?{" "}
                    <span onClick={switchToRegister} className="link">
                      Đăng ký ngay
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <Register
                closeModal={closeModal}
                onRegisterSuccess={switchToLogin}
                switchToLogin={switchToLogin}
              />
            )}
          </>
        ) : (
          <div>
            <h3>Chào mừng bạn đã đăng nhập!</h3>
            {userRole === "admin" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin-dashboard")}
              >
                Quản trị viên - Dashboard
              </Button>
            )}
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
