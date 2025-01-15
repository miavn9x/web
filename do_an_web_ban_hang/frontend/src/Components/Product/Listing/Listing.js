import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Listing.css";
import ProductItem from "../ProductItem/ProductItem";
import Carousel from "../../common/Carousel";

const Listing = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Hàm lấy danh sách sản phẩm
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Không cần tham số limit và page
        setProducts(response.data.products); // Gán danh sách sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Chỉ chạy 1 lần khi component được render

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <section className="home__product">
        <div className="container">
          <div className="product__row">
            {/* Carousel */}
            <div className="col-sm-12">
              <Carousel />
            </div>

            {/* Tiêu đề */}
            <div className="d-flex align-items-center product__row__title w-100">
              <div className="info product__info w-75">
                <h4 className="text-uppercase mb-0">Danh sách sản phẩm</h4>
                <div>
                  <p>tăng dần</p>
                  <p>giảm dần </p>
                </div>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
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
        </div>
      </section>
    </>
  );
};

export default Listing;
