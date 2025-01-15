import React from "react";
import "./product.css";
import CountdownTime from "../common/countdown time";
import { Button } from "@mui/material";
import { VscArrowRight } from "react-icons/vsc";
import ListProduct from "./Productlist/Productlist";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  // Hàm điều hướng
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <section className="home__product">
        <div className="product__row">
          {/* Khuyến mãi sốc */}
          <div className="product__row__sale">
            <div className="d-flex align-items-center product__row__title w-100">
              <div className="info product__info">
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
                Xem thêm <VscArrowRight />
              </Button>
            </div>
            <div className="product__row w-100 bg-white">
              <ListProduct
                isDiscounted={true}
                sortBy="discountPercentage"
                limit={5}
              />{" "}
            </div>
          </div>

          {/* Danh mục sản phẩm */}
          <div className="product__row__Product_catalog">
            <div className="d-flex align-items-center product__row__title w-100">
              <div className="info product__info">
                <h4
                  className="text-uppercase mb-0"
                  style={{ color: "red", paddingTop: "2px" }}
                >
                  Danh mục sản phẩm
                </h4>
              </div>
              <Button
                className="product__btn__viewall justify-content-end"
                onClick={() => handleNavigate("/danh-sach-san-pham")}
              >
                Xem thêm <VscArrowRight />
              </Button>
            </div>

            <div className="product__row w-100 bg-white">
              <ListProduct category="" limit={5} />{" "}
            </div>
          </div>


          {/* Tất cả sản phẩm */}
          <div className="product__row__all_products">
            <div className="d-flex align-items-center product__row__title w-100">
              <div className="info product__info">
                <h4
                  className="text-uppercase mb-0"
                  style={{ color: "red", paddingTop: "2px" }}
                >
                  Tất cả sản phẩm
                </h4>
              </div>
              <Button
                className="product__btn__viewall justify-content-end"
                onClick={() => handleNavigate("/danh-sach-san-pham")}
              >
                Xem thêm <VscArrowRight />
              </Button>
            </div>
            <div className="product__row w-100 bg-white">
              <ListProduct sortBy="random" limit={5} />{" "}
              {/* Hiển thị 10 sản phẩm ngẫu nhiên */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
