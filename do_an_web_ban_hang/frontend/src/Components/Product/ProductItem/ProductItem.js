import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./ProductItem.css";
import ProductModal from "../Productmodal/Productmodal";
import { formatter } from "../../../utils/fomater"; // Ensure the correct path
import axios from "axios";

const ProductItem = ({ product }) => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // State to track if the product is favorited
  const [notification, setNotification] = useState(""); // Notification state
  const navigate = useNavigate(); // Hook to handle navigation

  // Check if product data is available
  if (!product) {
    return <div>Không có sản phẩm này</div>; // Or display a placeholder if no product data
  }

  // Function to open product detail modal
  const viewProductDetail = () => {
    setIsOpenProductModal(true);
  };

  // Function to close product detail modal
  const closeProductModal = () => {
    setIsOpenProductModal(false);
  };

  // Function to handle adding product to favorites
  const handleAddToFavorites = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to /login if the user is not logged in
      navigate("/login"); // Redirect to the login page
      return; // Stop further execution of this function
    }

    axios
      .post(
        "http://localhost:5000/api/favorites",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsFavorited(true); // Mark as favorited after successful API call
        setNotification("Sản phẩm đã được thêm vào mục yêu thích.");
        setTimeout(() => setNotification(""), 5000); // Clear notification after 5 seconds
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm vào yêu thích:", error);
      });
  };

  return (
    <>
      <div className="product__item">
        {/* Check if the product has images */}
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} className="w-100" alt={product.name} />
        ) : (
          <img
            src="https://via.placeholder.com/150" // Placeholder image if no product image
            className="w-100"
            alt="Placeholder"
          />
        )}

        {/* Display notification if there is one */}
        {notification && (
          <div className="notification-message">{notification}</div>
        )}

        {/* Display discount badge if there's a discount */}
        {product.discountPercentage > 0 && (
          <span className="badge badge-primary bg-primary text-white py-1">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Action buttons */}
        <div className="action">
          {/* View product details button */}
          <Button onClick={viewProductDetail} className="btn-detail">
            <MdOutlineZoomOutMap />
          </Button>

          {/* Add to favorites button */}
          <Button
            onClick={handleAddToFavorites}
            className="btn-favorite"
            color={isFavorited ? "red" : "gray"}
          >
            <FaRegHeart />
          </Button>
        </div>

        {/* Product content */}
        <div className="product___content">
          <h4 className="text-center fs-6 py-2 px-3">{product.name}</h4>
          <span className="text-success d-block py-1 ps-3">
            {product.brand}
          </span>

          {/* Product rating */}
          <Rating
            name="read-only"
            value={product.rating || 0} // Default value if there's no rating
            readOnly
            size="small"
            precision={0.5}
            style={{ left: "10px" }}
          />

          {/* Product price */}
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "9px 0px" }}
          >
            <div className="product__prices">
              {/* Display original price and discounted price */}
              {product.originalPrice && (
                <span className="product___price text-decoration-line-through opacity-50">
                  {formatter(product.originalPrice)} {/* Format price */}
                </span>
              )}
              <span className="product__price___old text-danger fs-5 fw-bold">
                {formatter(product.priceAfterDiscount)}{" "}
                {/* Format discounted price */}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product detail modal */}
      {isOpenProductModal && (
        <ProductModal
          product={product}
          CloseProductModal={closeProductModal} // Function to close modal
        />
      )}
    </>
  );
};

export default ProductItem;
