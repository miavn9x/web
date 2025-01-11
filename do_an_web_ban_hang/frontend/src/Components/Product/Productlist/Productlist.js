import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscArrowRight } from "react-icons/vsc";
import { Button } from "@mui/material";
import "./Productlist.css";
import { useNavigate } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products?limit=5"
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="home__product">
      <div className="product__row">
        <div className="d-flex align-items-center product__row__title w-100">
          <div className="info product__info w-75">
            <h4 className="text-uppercase mb-0">Danh sách sản phẩm</h4>
          </div>
          <Button
            className="product__btn__viewall justify-content-end"
            onClick={() => handleNavigate("/danh-sach-san-pham")}
          >
            Xem thêm sản phẩm <VscArrowRight />
          </Button>
        </div>
        <div className="product__list_item w-100">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <div>Không có sản phẩm nào</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
