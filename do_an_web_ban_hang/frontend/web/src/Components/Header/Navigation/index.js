import { FiMenu } from "react-icons/fi";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "@mui/material";
import { CiShop } from "react-icons/ci";
import { TbMeat } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { TbBrandCakephp } from "react-icons/tb";
import { RiDrinks2Fill } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";

const Navigation = () => {
  const [isOpensidibarNav, setIsOpensidibarNav] = useState(true);
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 nav_left  ">
            <div className="d-flex align-items-center cardWrapper">
              <Button className=" menu_product" onClick={() => setIsOpensidibarNav(!isOpensidibarNav)}>
                <span className="menu_product_left">
                  <FiMenu />
                </span>
                <span className=" text-uppercase menu_product-center">
                  danh mục sản phẩm
                </span>
                <span className="menu_product_right">
                  <FaAngleDown />
                </span>
              </Button>
              <div className={`sidibarNav  w-100 z-2 bg-white ${isOpensidibarNav ? "show" : ""}`}>
                <ul className="list-unstyled ">
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        <CiShop />
                        shop
                        <AiFillCaretDown />
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-9 nav_right  align-items-center">
            <ul className="list list-inline  list-unstyled w-100 text-uppercase ">
              <li className="list-inline-item home__icone">
                <Link to="/">
                  <Button className="home__icone_button">
                    <FaHome />
                    home
                  </Button>
                </Link>
              </li>
              <li className="list-inline-item  ">
                <Link to="/">
                  <Button>
                    <CiShop />
                    shop
                    <AiFillCaretDown />
                  </Button>
                </Link>
                <div className="sub__menu shadow">
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <TbMeat />
                    THỊT & HẢI SẢN
                  </Button>
                </Link>
                <div className="sub__menu shadow">
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <GiFruitBowl />
                    rau & tráicây
                  </Button>
                </Link>
                <div className="sub__menu shadow">
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <TbBrandCakephp />
                    Bánh & kẹo
                  </Button>
                </Link>
                <div className="sub__menu shadow">
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                </div>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <RiDrinks2Fill />
                    đồ uống
                  </Button>
                </Link>
                <div className="sub__menu shadow">
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                  <Link to="/">
                    <Button>shop</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <IoCallOutline />
                    liên hệ
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
