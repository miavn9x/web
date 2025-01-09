// src/Components/common/Header/index.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { jwtDecode } from "jwt-decode"; // Sửa cách import
import Logo from "../../../assets/images/logo.png";
import CountryDropdown from "../../common/CountryDropdown/index";
import Search from "./Search";
import Login from "../../../Pages/Auth/Login/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navigation from "./Navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole(decodedToken?.role || "");
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location]);

  const toggleLoginModal = () => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      // Nếu đang ở trang /login hoặc /register, không mở modal
      navigate("/"); // Điều hướng về trang chủ hoặc một trang khác
    } else {
      setShowLoginModal(!showLoginModal);
    }
  };

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <>
      <header className="headerWrapper">
        <div className="container-fluid d-none d-sm-block bg-success">
          <div className="top-strip">
            <p className="mb-0 mt-0 text-center">
              Siêu ưu đãi cuối năm từ <b>20/12/2024 - 31/02/2025</b>, cơ hội{" "}
              <b>giảm giá đến 50%</b> giá trị đơn hàng.
            </p>
          </div>
        </div>
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                <CountryDropdown />
                <Search />
                <div className="part3 d-flex align-items-center ml-auto">
                  {isLoggedIn ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="mr-3 circle"
                      >
                        <FaRegUser />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {userRole !== "admin" && (
                          <>
                            <Dropdown.Item onClick={() => navigate("/profile")}>
                              Thông tin tài khoản
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/wishlist")}
                            >
                              Sản phẩm yêu thích
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/orders")}>
                              Các sản phẩm đã mua
                            </Dropdown.Item>
                          </>
                        )}
                        {userRole === "admin" && (
                          <>
                            <Dropdown.Item onClick={() => navigate("/admin")}>
                              Quản lý
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/Editproduct")}
                            >
                              Quản lý sản phẩm
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/add-product")}
                            >
                              Đăng sản phẩm
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item onClick={handleLogout}>
                          Đăng xuất
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <button className="mr-3 circle" onClick={toggleLoginModal}>
                      <FaRegUser />
                    </button>
                  )}
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <div className="position-relative ml-2">
                      <button
                        className="circle"
                        onClick={() => navigate("/cart")}
                      >
                        <FiShoppingCart />
                      </button>
                      <span className="count d-flex justify-content-center align-items-center">
                        0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <Navigation />
      </div>
      {showLoginModal && (
        <Login
          closeModal={toggleLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Header;
