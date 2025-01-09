import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "@mui/material"; // Dùng Link từ Material UI
import "./Error403.css";

const Error403 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== "admin") {
          navigate("/Error403");
        }
      } catch (error) {
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-9">
          <div className="error-403-container">
            <div className="error-403-content">
              <h1 className="error-403-title">403</h1>
              <h2 className="error-403-subtitle">Forbidden</h2>
              <p className="error-403-text">
                Bạn không có quyền truy cập trang này. Vui lòng quay lại trang
                chủ để truy cập.
              </p>
              <Link href="/" className="error-403-button">
                Quay lại Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error403;
