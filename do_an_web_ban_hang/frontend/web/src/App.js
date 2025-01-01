import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/listing";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout/Checkout";
import RequireLogin from "./Pages/RequireLogin/RequireLogin";
import Cart from "./Pages/Cart/Cart";
import AddProduct from "./Components/AddProduct";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useState } from "react";
import ProductTable from "./Components/ProductTable";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = (state) => {
    setShowLoginModal(state);
  };

  return (
    <BrowserRouter>
      <Header toggleLoginModal={toggleLoginModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/danh-sach-san-pham" element={<Listing />} />
        {/* Các route yêu cầu đăng nhập */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute setShowLoginModal={setShowLoginModal}>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/Editproduct"
          element={
            <PrivateRoute setShowLoginModal={setShowLoginModal}>
              <ProductTable />
            </PrivateRoute>
          }
        />

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
        <Route
          path="/dang-nhap"
          element={<Login closeModal={() => setShowLoginModal(false)} />}
        />
      </Routes>
      <Footer />
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
