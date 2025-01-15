// components/Favorites/Favorites.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate để chuyển hướng
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo import CSS của Bootstrap
import { formatter } from "../../../utils/fomater";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Danh sách sản phẩm yêu thích
  const navigate = useNavigate(); // Hook để chuyển hướng

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Gọi API để lấy danh sách sản phẩm yêu thích
        const response = await axios.get(
          "http://localhost:5000/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Lấy token từ localStorage
            },
          }
        );
        setFavorites(response.data.favorites); // Lưu danh sách yêu thích vào state
      } catch (error) {
        console.error("Lỗi lấy danh sách yêu thích:", error); // Thông báo lỗi nếu có
      }
    };

    fetchFavorites(); // Gọi hàm lấy danh sách yêu thích
  }, []);

  // Xử lý khi người dùng muốn xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFromFavorites = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      return;
    }

    try {
      // Gọi API để xóa sản phẩm khỏi yêu thích
      await axios.delete(`http://localhost:5000/api/favorites/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Sau khi xóa thành công, cập nhật lại danh sách yêu thích
      setFavorites(favorites.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi yêu thích:", error); // Thông báo lỗi nếu có
    }
  };

  // Xử lý khi người dùng nhấn nút mua ngay (hiện tại chỉ chuyển hướng đến trang thanh toán)
  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}`); // Chuyển hướng đến trang thanh toán với productId
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh sách yêu thích</h2>
      {favorites.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="table table-striped table-bordered">
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Thương hiệu</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favorites.map((product) => (
                <TableRow key={product._id}>
                  {/* Ảnh sản phẩm */}
                  <TableCell>
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      width={50} // Điều chỉnh kích thước ảnh nếu cần
                    />
                  </TableCell>

                  {/* Tên sản phẩm */}
                  <TableCell>{product.name}</TableCell>

                  {/* Thương hiệu */}
                  <TableCell>{product.brand}</TableCell>

                  {/* Giá sản phẩm */}
                  <TableCell>
                    <strong>
                      {formatter(product.priceAfterDiscount)}{" "}
                      {/* Định dạng giá */}
                    </strong>
                  </TableCell>

                  {/* Các nút hành động */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="danger"
                      className="btn-sm"
                      onClick={() => handleRemoveFromFavorites(product._id)} // Xóa sản phẩm khỏi yêu thích
                    >
                      Xóa
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn-sm ms-2"
                      onClick={() => handleBuyNow(product._id)} // Mua sản phẩm ngay
                    >
                      Mua
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="text-center">
          Không có sản phẩm nào trong danh sách yêu thích{" "}
          {/* Thông báo khi không có sản phẩm yêu thích */}
        </p>
      )}
    </div>
  );
};

export default Favorites;
