import React from "react";
import Carousel from "../../Components/Carousel/index";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../../Components/Product/product";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 " style={{ padding: "0" , margin: "0"}}>
            <Carousel />
          </div>
          <Product />
        </div>
      </div>
    </>
  );
};

export default Home;
