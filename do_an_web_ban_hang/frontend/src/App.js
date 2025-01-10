import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Listing from "./Components/Product/Listing/Listing";
import Header from "./Components/common/Header";
import Footer from "./Components/common/Footer/Footer";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Checkout from "./Pages/Product/Checkout/Checkout";
import Cart from "./Pages/Product/Cart/Cart";
import AddProduct from "./Components/Product/AddProduct/AddProduct";
import ProductTable from "./Components/Product/ProductTable/ProductTable";
import Error403 from "./Components/common/Error403/Error403";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserRole(decoded.role);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("token");
          setUserRole(null);
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Header
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/danh-sach-san-pham" element={<Listing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - User */}
        <Route
          path="/gio-hang"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/thanh-toan"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* Protected Routes - Admin */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              requiredRole="admin"
            >
              <Routes>
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-product" element={<ProductTable />} />
              </Routes>
            </PrivateRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/Error403" element={<Error403 />} />
        <Route path="*" element={<Navigate to="/Error403" replace />} />
      </Routes>

      <Footer />

      {showLoginModal && (
        <Login
          isModal={true}
          closeModal={() => setShowLoginModal(false)}
          onLoginSuccess={(role) => {
            setUserRole(role);
            setIsAuthenticated(true);
            setShowLoginModal(false);
          }}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
