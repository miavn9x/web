import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Components/contexts/AuthContext";

const RequireLogin = ({ children }) => {
  const { user } = useAuth(); // Lấy thông tin user từ Context
  const location = useLocation(); // Lấy vị trí trang hiện tại

  if (!user) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireLogin;
