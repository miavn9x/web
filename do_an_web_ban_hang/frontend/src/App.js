import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Listing from "./Components/Product/Listing/Listing";
import Header from "./Components/common/Header/index";
import Footer from "./Components/common/Footer/Footer";
import Login from "./Pages/Auth/Login/index";
import Checkout from "./Pages/Product/Checkout/Checkout";
import RequireLogin from "./Pages/RequireLogin/RequireLogin";
import Cart from "./Pages/Product/Cart/Cart";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AddProduct from "./Components/Product/AddProduct/AddProduct";
import ProductTable from "./Components/Product/ProductTable/ProductTable";
import Error403 from "./Components/common/Error403/Error403";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Hàm để mở hoặc đóng modal đăng nhập
  const toggleLoginModal = (state) => {
    setShowLoginModal(state);
  };

  return (
    <BrowserRouter>
      <Header toggleLoginModal={toggleLoginModal} />
      <Routes>
        {/* Route chính */}
        <Route path="/" element={<Home />} />
        <Route path="/danh-sach-san-pham" element={<Listing />} />
        {/* <Route path="/403" element={<Error403 />} /> */}

        {/* Các route yêu cầu quyền admin */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute
              requiredRole="admin"
              setShowLoginModal={setShowLoginModal}
            >
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/Editproduct"
          element={
            <PrivateRoute
              requiredRole="admin"
              setShowLoginModal={setShowLoginModal}
            >
              <ProductTable />
            </PrivateRoute>
          }
        />

        {/* Các route yêu cầu đăng nhập */}
        <Route
          path="/gio-hang"
          element={
            <RequireLogin>
              <Cart />
            </RequireLogin>
          }
        />
        <Route
          path="/thanh-toan"
          element={
            <RequireLogin>
              <Checkout />
            </RequireLogin>
          }
        />

        {/* Route đăng nhập */}
        <Route
          path="/login"
          element={<Login closeModal={() => setShowLoginModal(false)} />}
        />

        {/* Route xử lý khi không đủ quyền */}
        <Route path="/Error403" element={<Error403 />} />
      </Routes>

      <Footer />

      {/* Hiển thị modal đăng nhập nếu trạng thái được bật */}
      {showLoginModal && (
        <Login
          closeModal={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
