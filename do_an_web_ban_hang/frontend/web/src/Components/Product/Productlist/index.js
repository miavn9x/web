import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { Button } from "@mui/material";
import ProductItem from "../ProductItem";
import "./style.css";
const ProductList = () => {
  return (
    <section className="home__product">
      <div className="product__row">
        <div className="d-flex align-items-center product__row__title  w-100">
          <div className="info product__info w-75 ">
            <h4 className="text-uppercase mb-0">Danh sách san phẩm</h4>
          </div>
          <Button className="product__btn__viewall justify-content-end">
            Xem thêm khuyến mãi <VscArrowRight />
          </Button>
        </div>
        <div className="product__list_item w-100 ">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </section>
  );
};

export default ProductList;
