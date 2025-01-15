import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatter } from "../../../utils/fomater";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // MUI Button
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../../../redux/cartActions"; // Assuming Redux actions

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the subtotal of all items in the cart
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.product.priceAfterDiscount,
      0
    );
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId)); // Redux action to remove item
  };

  // Handle updating the item quantity
  const handleQuantityChange = (productId, action) => {
    if (action === "increase") {
      dispatch(updateItemQuantity(productId, 1)); // Increase quantity by 1
    } else if (action === "decrease") {
      dispatch(updateItemQuantity(productId, -1)); // Decrease quantity by 1
    }
  };

  // Handle proceeding to checkout
  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Giỏ Hàng</h2>
      <div className="row">
        {/* Left Panel: Cart Items */}
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item.product._id}
                  className="list-group-item d-flex align-items-center mb-3"
                >
                  {/* Image */}
                  <div className="col-3">
                    <img
                      src={
                        item.product.image || "https://via.placeholder.com/150" // Default placeholder if no image
                      }
                      alt={item.product.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "100px", objectFit: "cover" }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="col-6">
                    <h5>{item.product.name}</h5>
                    <p>{formatter(item.product.priceAfterDiscount)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-3 d-flex justify-content-between align-items-center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        handleQuantityChange(item.product._id, "decrease")
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        handleQuantityChange(item.product._id, "increase")
                      }
                    >
                      +
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Panel: Checkout */}
        <div className="col-md-4">
          <div className="border p-3 rounded">
            <h4>Tổng cộng</h4>
            <div className="d-flex justify-content-between">
              <p>Subtotal:</p>
              <p>{formatter(calculateSubtotal())}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Phí vận chuyển:</p>
              <p>Free</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Thành tiền:</p>
              <p>{formatter(calculateSubtotal())}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
