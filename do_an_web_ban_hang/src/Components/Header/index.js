import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import CountryDropdown from "../CountryDropdown";
// import { Search } from "@mui/icons-material";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
const Header = () => {
  return (
    <>
      <header className="headerWrapper">
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
              <div className="col-sm-10 d-flex align-items-center store_location">
                <CountryDropdown />

                {/* {Search} */}
                <div
                  className="Hearder_search ml-3 mr-3 "
                  style={{ fontFamily: "Calibri" }}
                >
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm tại Siêu Thị Xanh . . ."
                  />
                  <button>
                    <IoIosSearch />
                  </button>
                </div>
                {/* login */}

                <div className="d-flex align-items-center hreader_login">
                  {/* Nút đăng nhập */}
                  <button className="circle">
                    <FaRegUser />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
