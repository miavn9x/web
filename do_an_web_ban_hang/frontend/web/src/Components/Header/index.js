import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import CountryDropdown from "../CountryDropdown";
import Search from "./Search";
import { FaRegUser } from "react-icons/fa";
import { formatter } from "../../utils/fomater";
import { FiShoppingCart } from "react-icons/fi";
import Navigation from "./Navigation";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <>
      <header className="headerWrapper ">
        <div className="container-fluid d-none d-sm-block ">
          <div className="top-strip bg-success ">
            <div className="container">
              <p className=" mb-0 mt-0 text-center  ">
                Siêu ưu đãi cuối năm từ <b> 20/12/2024 - 31/01/2025 </b> cơ hội{" "}
                <b>giảm giá đến 50%</b> giá trị đơn hàng
              </p>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper  d-flex align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                <CountryDropdown />
                <Search />

                <div className="part3  d-flex align-items-center ml-auto ">
                  <Button className="mr-3 circle ">
                    <FaRegUser />
                  </Button>
                  <div className="ml-auto cartTab d-flex align-items-center ">
                    <span className="price">{formatter(500000)}</span>
                    <div className="position-relative ml-2">
                      <Button className="circle">
                        <FiShoppingCart />
                      </Button>
                      <span className="count d-flex justify-content-center align-items-center">
                        0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
};

export default Header;
