import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Productlist.css";
import ProductItem from "../ProductItem/ProductItem";

const ListProduct = ({ category, sortBy, limit }) => {
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State lưu trạng thái đang tải

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Bắt đầu tải sản phẩm
      try {
        let url = "http://localhost:5000/api/products"; // URL cơ bản để lấy sản phẩm
        if (category) {
          url = `${url}/category/${category}`; // Lọc sản phẩm theo category nếu có
        }

        const response = await axios.get(url);
        let fetchedProducts = response.data.products;

        if (!fetchedProducts || fetchedProducts.length === 0) {
          setLoading(false);
          return;
        }

        // Sắp xếp sản phẩm nếu cần
        if (sortBy === "discountPercentage") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => b.discountPercentage - a.discountPercentage
          );
        } else if (sortBy === "random") {
          fetchedProducts = fetchedProducts.sort(() => Math.random() - 0.5);
        }

        // Giới hạn số lượng sản phẩm nếu cần
        if (limit) {
          fetchedProducts = fetchedProducts.slice(0, limit);
        }

        setProducts(fetchedProducts); // Cập nhật state với danh sách sản phẩm đã lọc
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, limit]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section className="home__product">
      <div className="product__row">
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
