// src/Components/RequireLogin.js
import { useEffect } from "react"; // Không cần import React nếu không sử dụng JSX
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  return children;
};

export default RequireLogin;
