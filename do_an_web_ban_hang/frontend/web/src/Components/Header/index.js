import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // UseEffect hook to check if the user is logged in (based on token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Toggle login modal visibility
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  // Handle login success, update login state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false); // Close login modal on successful login
  };

  // Handle logout, remove token from localStorage and update state
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };


  return (
    <>
      <header className="headerWrapper">
        <div className="container-fluid d-none d-sm-block">
          <div className="top-strip bg-success">
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
                        <Dropdown.Item >Thông tin tài khoản</Dropdown.Item>
                        <Dropdown.Item>Số sản phẩm yêu thích</Dropdown.Item>
                        <Dropdown.Item>Các sản phẩm đã mua</Dropdown.Item>
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
      <Navigation/>

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
