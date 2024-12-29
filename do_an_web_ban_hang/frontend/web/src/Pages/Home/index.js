import React from "react";
import Carousel from "../../Components/Carousel/index";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../../Components/Product/product";
import Productcart from "../../Components/Product/Productcart";

const Home = () => {
  

 

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
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
