import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequireLogin = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default RequireLogin;
