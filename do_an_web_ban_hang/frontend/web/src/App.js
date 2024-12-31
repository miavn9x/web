import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/listing";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";

// import Login from "./Pages/Login";
// Các trang mới
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout/Checkout";
import RequireLogin from "./Pages/RequireLogin/RequireLogin";
import Cart from "./Pages/Cart/Cart";

import AddProduct from "./Components/AddProduct"; // Import AddProduct


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/danh-sach-san-pham" exact={true} element={<Listing />} />
        {/* <Route path="/danh-sach-san-pham" exact={true} element={<Listing />} /> */}
        <Route path="/add-product" exact={true} element={<AddProduct />} />{" "}
        {/* Trang đăng nhập */}
        <Route path="/dang-nhap" exact={true} element={<Login />} />
        {/* Các trang yêu cầu người dùng đăng nhập */}
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
        {/* <Route path="/dang-nhap" exact={true} element={<Login />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

