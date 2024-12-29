import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./style.css";
import '../Productcart/style.css'
const Productcart = () => {
  return (
    <>
      <div className="product_cart">
        <div className="container">
          <div className="row">
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              navigation={true}
              slidesPerGroup={0}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="Swiper "
            >
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/www/Content/images/icon-history.v202301091407.png"
                    alt=""
                  />
                  <p className="fs-6">Mua trên Tgdd</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Sinh Tố Lúa Mạch</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Productcart;
