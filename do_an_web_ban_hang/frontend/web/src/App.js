import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/listing";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";
// import Login from "./Pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/danh-sach-san-pham" exact={true} element={<Listing />} />
        {/* <Route path="/dang-nhap" exact={true} element={<Login />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

