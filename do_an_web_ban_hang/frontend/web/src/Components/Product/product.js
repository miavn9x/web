import React from "react";
import "./style.css";
import CountdownTime from "../countdown time";
import { Button } from "@mui/material";
import { VscArrowRight } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductItem from "./ProductItem";
const Product = () => {
  return (
    <>
      <section className="home__product">
        <div className="container">
          <div className="row">
            <div className=" product__row">
              <div className="d-flex align-items-center product__row__title">
                <div className="info product__info w-75">
                  <h3 className="text-uppercase mb-0">Khuyến mãi sốc</h3>
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
              <div className="product__row w-100 mt-4 bg-white">
                <Swiper
                  slidesPerView={6}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                  // navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
