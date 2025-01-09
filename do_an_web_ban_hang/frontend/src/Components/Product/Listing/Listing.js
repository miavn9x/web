import React from "react";
import "./style.css";
import ProductItem from "../ProductItem";
import Carousel from "../../common/Carousel";


const Listing = () => {
  return (
    <>
      <section className="home__product">
        <div className="container">
          <div className="product__row row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9">
              <Carousel />
            </div>

            <div className="d-flex align-items-center product__row__title  w-100">
              <div className="info product__info w-75 ">
                <h4 className="text-uppercase mb-0">Danh sách sản phẩm</h4>
              </div>
            </div>
            <div className="product__list_item w-100 ">
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
