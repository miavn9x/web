import React from "react";
import "./product.css";
import CountdownTime from "../common/countdown time";
import { Button } from "@mui/material";
import { VscArrowRight } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductItem from "./ProductItem/ProductItem";
import ListProduct from "./Productlist/Productlist";
const Product = () => {
  return (
    <>
      <section className="home__product">
        <div className="product__row">
          <div className="d-flex align-items-center product__row__title  w-100">
            <div className="info product__info w-75 ">
              <h4
                className="text-uppercase mb-0"
                style={{ color: "red", paddingTop: "2px" }}
              >
                Khuyến mãi sốc
              </h4>
              <p className="product__sale d-flex justify-content-center align-items-center">
                Flash Sale :
                <span className="product__time">
                  <CountdownTime />
                </span>
              </p>
            </div>
            <Button className="product__btn__viewall justify-content-end">
              Xem thêm khuyến mãi <VscArrowRight />
            </Button>
          </div>
          <div className="product__row w-100 bg-white">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductItem />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <div>
        <ListProduct />
      </div>
    </>
  );
};

export default Product;
