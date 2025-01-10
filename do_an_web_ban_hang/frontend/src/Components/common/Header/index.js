import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import Logo from "../../../assets/images/logo.png";
import CountryDropdown from "../../common/CountryDropdown/index";
import Search from "./Search";
import Login from "../../../Pages/Auth/Login";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Định nghĩa handleLogout trước để có thể sử dụng trong checkLoginStatus
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    setCartCount(0);
    navigate("/");
  }, [navigate]);

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          setIsLoggedIn(true);
          setUserRole(decoded.role);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [handleLogout]); // Thêm handleLogout vào dependencies

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLoginClick = useCallback(() => {
    if (location.pathname === "/login") {
      navigate("/");
    } else {
      setShowLoginModal(true);
    }
  }, [location.pathname, navigate]);

  const handleLoginSuccess = useCallback(
    (role) => {
      setIsLoggedIn(true);
      setUserRole(role);
      setShowLoginModal(false);
      checkLoginStatus();
    },
    [checkLoginStatus]
  );

  return (
    <>
      <header className="headerWrapper">
        {/* Banner section */}
        <div className="container-fluid d-none d-sm-block bg-success">
          <div className="top-strip">
            <p className="mb-0 mt-0 text-center">
              Siêu ưu đãi cuối năm từ <b>20/12/2024 - 31/02/2025</b>, cơ hội{" "}
              <b>giảm giá đến 50%</b> giá trị đơn hàng.
            </p>
          </div>
        </div>

        {/* Main header section */}
        <div className="header">
          <div className="container">
            <div className="row">
              {/* Logo */}
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>

              {/* Main content area */}
              <div className="col-sm-10 d-flex align-items-center part2 col-sm-10">
                <CountryDropdown />
                <Search />
                {/* User and Cart section */}
                <div className="part3 d-flex align-items-center ml-auto col-sm-2">
                  {/* User dropdown/login button */}
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
                        {userRole === "admin" ? (
                          <>
                            <Dropdown.Item
                              onClick={() => navigate("/admin/user-management")}
                            >
                              Quản lý user
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/admin/edit-product")}
                            >
                              Quản lý sản phẩm
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/admin/add-product")}
                            >
                              Đăng sản phẩm
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item
                              onClick={() => navigate("/")}
                            >
                              Thông tin tài khoản
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate("/")}
                            >
                              Sản phẩm yêu thích
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/")}>
                              Các sản phẩm đã mua
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item onClick={handleLogout}>
                          Đăng xuất
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <button className="mr-3 circle" onClick={handleLoginClick}>
                      <FaRegUser />
                    </button>
                  )}

                  {/* Shopping cart */}
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <div className="position-relative ml-2">
                      <button
                        className="circle"
                        onClick={() => navigate("/gio-hang")}
                      >
                        <FiShoppingCart />
                      </button>
                      <span className="count d-flex justify-content-center align-items-center">
                        {cartCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation menu */}
      <Navigation />

      {/* Login modal */}
      {showLoginModal && (
        <Login
          isModal={true}
          closeModal={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Header;
