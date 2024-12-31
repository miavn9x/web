import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate vào đây
import { Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Logo from "../../assets/images/logo.png";
import CountryDropdown from "../CountryDropdown";
import Search from "./Search";
import Login from "../../Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Navigation from "./Navigation";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate(); // Thêm useNavigate tại đây

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken?.role || "";
      setUserRole(userRole);
    }
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken?.role || "";
    setUserRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const handleClick = () => {
    navigate("/add-product"); // Điều hướng đến AddProduct
  };

  return (
    <>
      <header className="headerWrapper">
        <div className="container-fluid d-none d-sm-block bg-success">
          <div className="top-strip">
            <div className="container">
              <p className="mb-0 mt-0 text-center">
                Siêu ưu đãi cuối năm từ <b>20/12/2024 - 31/02/2025</b>, cơ hội
                <b> giảm giá đến 50%</b> giá trị đơn hàng.
              </p>
            </div>
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
                            <Dropdown.Item>Thông tin tài khoản</Dropdown.Item>
                            <Dropdown.Item>Số sản phẩm yêu thích</Dropdown.Item>
                            <Dropdown.Item>Các sản phẩm đã mua</Dropdown.Item>
                          </>
                        )}
                        {userRole === "admin" && (
                          <>
                            <Dropdown.Item>Quản lý</Dropdown.Item>
                            <Dropdown.Item>Quản lý sản phẩm</Dropdown.Item>
                            <Dropdown.Item onClick={handleClick}>
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
                      <button className="circle">
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
          onLoginSuccess={handleLoginSuccess} // Truyền hàm xử lý đăng nhập thành công
        />
      )}
    </>
  );
};

export default Header;
