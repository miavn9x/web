import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import "./ProductItem.css";
import ProductModal from "../Productmodal/Productmodal";
import { formatter } from "../../../utils/fomater";


const ProductItem = ({ product }) => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  if (!product) {
    return null; // hoặc return một placeholder/skeleton
  }

  const viewProductDetail = () => {
    setIsOpenProductModal(true);
  };

  const CloseProductModal = () => {
    setIsOpenProductModal(false);
  };

  return (
    <>
      <div className="product__item">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} className="w-100" alt={product.name} />
        ) : (
          <img
            src="placeholder-image-url.jpg" // Thay bằng URL ảnh placeholder
            className="w-100"
            alt="Placeholder"
          />
        )}
        <span className="badge badge-primary bg-primary text-white py-1">
          -{product.discountPercentage || 0}%
        </span>
        <div className="action">
          <Button onClick={viewProductDetail}>
            <MdOutlineZoomOutMap />
          </Button>
          <Button>
            <FaRegHeart />
          </Button>
        </div>
        <div className="product___content">
          <h4 className="text-center fs-6 py-2  px-3"
         >{product.name}</h4>
          <span className="text-success d-block py-1 ps-3">
            {product.brand}
          </span>
          <Rating
            name="read-only"
            value={product.rating || 0}
            readOnly
            size="small"
            precision={0.5}
            style={{ left: "10px" }}
          />
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "9px 0px" }}
          >
            <div className="product__prices">
              <span className="product___price text-decoration-line-through opacity-50">
                {formatter(product.originalPrice)}
              </span>
              <span className="product__price___old text-danger fs-5 fw-bold">
                {formatter(product.priceAfterDiscount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isOpenProductModal && (
        <ProductModal product={product} CloseProductModal={CloseProductModal} />
      )}
    </>
  );
};

export default ProductItem;
