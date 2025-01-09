import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để xem giỏ hàng.");
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken.userId) {
        throw new Error("Token không hợp lệ.");
      }
      // Gọi API để lấy giỏ hàng của user
      fetch(`/api/cart/${decodedToken.userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.cartItems);
          calculateTotal(data.cartItems);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        });
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      navigate("/login");
    }
  }, [navigate]);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.priceAfterDiscount * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cartItems];
    if (type === "increase") {
      updatedCart[index].quantity += 1;
    } else if (type === "decrease" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    // Gửi cập nhật giỏ hàng lên API
    updateCartOnServer(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    // Gửi cập nhật giỏ hàng lên API
    updateCartOnServer(updatedCart);
  };

  const updateCartOnServer = (updatedCart) => {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).userId;
    fetch(`/api/cart/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: updatedCart }),
    }).catch((error) => console.error("Lỗi khi cập nhật giỏ hàng:", error));
  };

  const handleCheckout = () => {
    alert("Đã tiến hành thanh toán!");
    setCartItems([]);
    setTotalPrice(0);
    // Xóa giỏ hàng trên server
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).userId;
    fetch(`/api/cart/${userId}`, {
      method: "DELETE",
    }).catch((error) => console.error("Lỗi khi xóa giỏ hàng:", error));
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng cộng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-info">
                      <img src={item.images[0]} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                  </td>
                  <td>{item.priceAfterDiscount.toLocaleString()} ₫</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(index, "decrease")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {(item.priceAfterDiscount * item.quantity).toLocaleString()}{" "}
                    ₫
                  </td>
                  <td>
                    <button onClick={() => handleRemoveItem(index)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Tổng số tiền: {totalPrice.toLocaleString()} ₫</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Thanh toán
            </button>
          </div>
        </div>
      )}
      <Link to="/" className="back-to-home">
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default Cart;
