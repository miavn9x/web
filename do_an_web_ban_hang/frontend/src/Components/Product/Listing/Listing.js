import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Listing.css";
import ProductItem from "../ProductItem/ProductItem";
import Carousel from "../../common/Carousel";

const Listing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products?limit"
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



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="home__product">
        <div className="container">
          <div className="product__row">
            <div className="col-sm-12">
              <Carousel />
            </div>

            <div className="d-flex align-items-center product__row__title  w-100">
              <div className="info product__info w-75 ">
                <h4 className="text-uppercase mb-0">Danh sách sản phẩm</h4>
              </div>
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
        </div>
      </section>
    </>
  );
};

export default Listing;
