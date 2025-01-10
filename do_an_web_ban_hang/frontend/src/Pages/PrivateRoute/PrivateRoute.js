import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, requiredRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && requiredRole !== "admin") {
    return <Navigate to="/Error403" replace />;
  }

  return children;
};

export default PrivateRoute;
