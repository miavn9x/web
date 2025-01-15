// components/Favorites/Favorites.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../../../Components/Product/ProductItem/ProductItem";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error("Lỗi lấy danh sách yêu thích:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Danh sách yêu thích</h2>
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <p>Không có sản phẩm nào trong danh sách yêu thích</p>
      )}
    </div>
  );
};

export default Favorites;
