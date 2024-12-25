import React from "react";
import "./style.css";
import CountdownTime from "../countdown time";
import { Button } from "@mui/material";
import { VscArrowRight } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const Product = ({ product }) => {
  //   const productslider = {
  //     dots: true,
  //     infinite: false,
  //     speed: 500,
  //     slidesToShow: 4,
  //     slidesToScroll: 1,
  //   };

  return (
    <>
      <section className="home__product">
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 product__row">
              <div className="d-flex align-items-center">
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
              <div className="product__row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  //   navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="product__img">
                      <img
                        src="https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/9498/329379/bhx/slide-40_202410081125173465.jpg"
                        className="w-100"
                        alt="Product 1"
                      />
                      <div>
                        <h3 class="product_name mb-4px line-clamp-2 h-[27px] px-2px text-11 leading-[14px] text-[#222B45] lg:h-[36px] lg:text-16 lg:leading-[18px]">
                          Kem dưỡng Olay Niacinamide + AHA tái tạo &amp; ngừa
                          lão hóa 50g
                        </h3>
                      </div>
                    </div>
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
