import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { Button } from "@mui/material";
import "./Productlist.css";
import { useNavigate } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";

const ListProduct = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="home__product">
      <div className="product__row">
        <div className="d-flex align-items-center product__row__title  w-100">
          <div className="info product__info w-75 ">
            <h4 className="text-uppercase mb-0">Danh sách san phẩm</h4>
          </div>
          <Button
            className="product__btn__viewall justify-content-end"
            onClick={() => handleNavigate("/danh-sach-san-pham")}
          >
            Xem thêm sản phẩm <VscArrowRight />
          </Button>
        </div>
        <div className="product__list_item w-100 ">
          {/* hiện thị toàn bộ sản phẩm tại  đây */}

          <ProductItem />
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
