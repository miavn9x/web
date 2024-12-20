import { FiMenu } from "react-icons/fi";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = () => {
  return (
    <nav spacing={2} direction="row">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 nav_left">
            <Button className="menu_product">
              <span className="">
                <FiMenu />
              </span>
              <span className="text text-uppercase  ">danh mục sản phẩm</span>
            </Button>
          </div>

          <div className="col-sm-3 nav_right"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
