import React from "react";
import Carousel from "../../Components/Carousel/index";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../../Components/Product/product";
const Home = () => {
  return (
    <>
      <Carousel />
      <Product />
    </>
  );
};

export default Home;
