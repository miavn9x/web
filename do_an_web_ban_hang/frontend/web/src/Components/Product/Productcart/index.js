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
              slidesPerView={9}
              spaceBetween={10}
              navigation={false}
              slidesPerGroup={1}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="Swiper "
            >
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdn.tgdd.vn/bachhoaxanh/menuheader/-202407291413395428.png"
                    alt=""
                  />
                  <p className="fs-6">Bia, nước có cồn</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/sua-tuoi-202210311320147075_202408291415515944.png"
                    alt=""
                  />
                  <p className="fs-6">Sữa tươi</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/icon-cate-gao-1_202409162319347446.png"
                    alt=""
                  />
                  <p className="fs-6">Gạo các loại</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8820/image-2462_202410151407484444.png"
                    alt=""
                  />
                  <p className="fs-6">Rau lá</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8788/image-2461_202410151408000050.png"
                    alt=""
                  />
                  <p className="fs-6">Trái cây</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8785/image-2463_202410151407419129.png"
                    alt=""
                  />
                  <p className="fs-6">Củ, quả</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8781/image-1202410181218245372_202412161434503628.png "
                    alt=""
                  />
                  <p className="fs-6">Thịt heo</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/2565/image-522_202410101609480522.png"
                    alt=""
                  />
                  <p className="fs-6">Mì ăn liền</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8782/untitled-3_202412251321551206.png"
                    alt=""
                  />
                  <p className="fs-6">Cá, hải sản, khô</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8790/untitled-2_202412251323019559.png"
                    alt=""
                  />
                  <p className="fs-6">Thịt gà, vịt, chim</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item text-center">
                  <img
                    src="https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8783/da-1202410181219323572_202412110951188842.png"
                    alt=""
                  />
                  <p className="fs-6">Trứng gà, vịt, cút</p>
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
