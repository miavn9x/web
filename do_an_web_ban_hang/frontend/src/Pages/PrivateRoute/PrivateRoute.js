import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component
const PrivateRoute = ({ isAuthenticated, requiredRole, children }) => {
  // Kiểm tra xem người dùng có đăng nhập chưa
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền truy cập của người dùng
  if (requiredRole && requiredRole !== "admin") {
    return <Navigate to="/Error403" replace />;
  }

  // Nếu đăng nhập và có quyền truy cập, hiển thị children (nội dung trang cần bảo vệ)
  return children;
};

export default PrivateRoute;
