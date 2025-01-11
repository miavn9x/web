import React from "react";
import { Button, Rating } from "@mui/material";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import "./ProductItem.css";
import { useState } from "react";
import ProductModal from "../Productmodal/Productmodal";
const ProductItem = () => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const viewProductDetail = (id) => {
    setIsOpenProductModal(true);
  };

  const CloseProductModal = () => {
    setIsOpenProductModal(false);
  };

  return (
    <>
      <div className="product__item">
        <img
          src="https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/6562/332944/bhx/anh-slide-26_202412091504407992.jpg"
          className="w-100"
          alt="Product 1"
        />
        <span className="badge badge-primary bg-primary text-white">-20%</span>
        <div className="action">
          <Button onClick={() => viewProductDetail(1)}>
            <MdOutlineZoomOutMap />
          </Button>
          <Button>
            <FaRegHeart />
          </Button>
        </div>
        <div>
          <h4 className="text-center fs-6 ">
            Máy ảnh Canon EOS 200D II &amp; ngừa lão hóa 50g
          </h4>
          <span className="text-success d-block">oop</span>
          <Rating
            name="read-only"
            value={6}
            readOnly
            size="small"
            precision={0.5}
          />
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "0 10px" }}
          >
            <span className="product__price text-decoration-line-through opacity-50">
              15.000đ
            </span>
            <span className="product__price__old text-danger fs-5 fw-bold">
              12.000đ
            </span>
          </div>
        </div>
      </div>

      {/* <ProductModal /> */}
      {isOpenProductModal === true && <ProductModal CloseProductModal = {CloseProductModal}/>}
    </>
  );
};

export default ProductItem;
