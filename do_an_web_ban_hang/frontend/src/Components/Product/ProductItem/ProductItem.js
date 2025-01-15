import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import "./ProductItem.css";
import ProductModal from "../Productmodal/Productmodal";
import { formatter } from "../../../utils/fomater"; // Đảm bảo bạn đã nhập đúng đường dẫn

const ProductItem = ({ product }) => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  // Kiểm tra xem có dữ liệu sản phẩm không
  if (!product) {
    return <div>Không có sản phẩm này</div>; // Hoặc hiển thị một placeholder cho trường hợp không có dữ liệu
  }

  // Hàm mở modal chi tiết sản phẩm
  const viewProductDetail = () => {
    setIsOpenProductModal(true);
  };

  // Hàm đóng modal chi tiết sản phẩm
  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  return (
    <>
      <div className="product__item">
        {/* Kiểm tra nếu có ảnh sản phẩm */}
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} className="w-100" alt={product.name} />
        ) : (
          <img
            src="https://via.placeholder.com/150" // Đặt URL ảnh placeholder khi không có ảnh sản phẩm
            className="w-100"
            alt="Placeholder"
          />
        )}

        {/* Hiển thị badge giảm giá nếu có */}
        {product.discountPercentage > 0 && (
          <span className="badge badge-primary bg-primary text-white py-1">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Các nút hành động */}
        <div className="action">
          {/* Nút xem chi tiết sản phẩm */}
          <Button onClick={viewProductDetail} className="btn-detail">
            <MdOutlineZoomOutMap />
          </Button>

          {/* Nút thêm vào yêu thích */}
          <Button className="btn-favorite">
            <FaRegHeart />
          </Button>
        </div>

        {/* Nội dung thông tin sản phẩm */}
        <div className="product___content">
          <h4 className="text-center fs-6 py-2 px-3">{product.name}</h4>
          <span className="text-success d-block py-1 ps-3">
            {product.brand}
          </span>

          {/* Hiển thị đánh giá sản phẩm */}
          <Rating
            name="read-only"
            value={product.rating || 0} // Giá trị mặc định nếu không có rating
            readOnly
            size="small"
            precision={0.5}
            style={{ left: "10px" }}
          />

          {/* Hiển thị giá */}
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "9px 0px" }}
          >
            <div className="product__prices">
              {/* Hiển thị giá gốc và giá sau giảm giá */}
              {product.originalPrice && (
                <span className="product___price text-decoration-line-through opacity-50">
                  {formatter(product.originalPrice)} {/* Định dạng giá */}
                </span>
              )}
              <span className="product__price___old text-danger fs-5 fw-bold">
                {formatter(product.priceAfterDiscount)}{" "}
                {/* Định dạng giá sau giảm giá */}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal hiển thị chi tiết sản phẩm */}
      {isOpenProductModal && (
        <ProductModal
          product={product}
          CloseProductModal={closeProductModal} // Hàm đóng modal
        />
      )}
    </>
  );
};

export default ProductItem;
