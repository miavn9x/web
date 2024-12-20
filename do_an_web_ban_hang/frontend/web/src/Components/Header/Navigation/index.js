import { FiMenu } from "react-icons/fi";


const Navigation = () => {
  return (
    <nav spacing={2} direction="row">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 nav_left">
            <button className="menu_product">
              <span className="text text-uppercase  ">
                <FiMenu />
                danh mục sản phẩm
              </span>
            </button>
            <button >jvjvuuuuuuuuuuuuuuuuuuuuvj</button>
          </div>

          <div className="col-sm-3 nav_right"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
