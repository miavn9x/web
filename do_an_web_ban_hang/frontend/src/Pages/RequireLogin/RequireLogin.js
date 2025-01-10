// src/Components/RequireLogin/RequireLogin.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ setShowLoginModal, children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setShowLoginModal(true);
      navigate("/login");
    }
  }, [token, navigate, setShowLoginModal]);

  return token ? children : null;
};

export default RequireLogin;
