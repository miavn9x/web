import React from "react";
import Carousel from "../../Components/common/Carousel/index";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../../Components/Product/product";
import Productcart from "../../Components/Product/product_menu";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Carousel />

            <Productcart />
          </div>
          <div className="col-sm-12">
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
