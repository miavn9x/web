import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { formatter } from "../../../utils/fomater";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  removeFromCart,
  updateCartQuantity,
  loadCartFromLocalStorage,
} from "../../../redux1/actions/cartActions";

// Selector với kiểm tra dữ liệu
const selectCartItems = createSelector(
  (state) => state.cart.items,
  (cartItems) => (Array.isArray(cartItems) ? cartItems : [])
);

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item?.product?.priceAfterDiscount) return total;
      return (
        total +
        (Number(item.quantity) || 0) * Number(item.product.priceAfterDiscount)
      );
    }, 0);
  };

  const handleRemoveFromCart = (productId) => {
    if (productId) {
      dispatch(removeFromCart(productId));
    }
  };

  const handleQuantityChange = (productId, action) => {
    const item = cartItems.find((item) => item?.product?._id === productId);
    if (!item) return;

    const currentQuantity = Number(item.quantity) || 0;

    if (action === "increase") {
      dispatch(updateCartQuantity(productId, currentQuantity + 1));
    } else if (action === "decrease" && currentQuantity > 1) {
      dispatch(updateCartQuantity(productId, currentQuantity - 1));
    }
  };

  const handleCheckout = () => {
    if (!cartItems.length) {
      alert("Giỏ hàng của bạn đang rỗng. Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Giỏ Hàng</h2>
      <div className="row">
        <div className="col-md-8">
          {!cartItems.length ? (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map(
                (item) =>
                  item?.product && (
                    <li
                      key={item.product._id}
                      className="list-group-item d-flex align-items-center mb-3"
                    >
                      <div className="col-3">
                        <img
                          src={
                            item.product.image ||
                            "https://via.placeholder.com/150"
                          }
                          alt={item.product.name || "Product"}
                          className="img-fluid rounded"
                          style={{ maxHeight: "100px", objectFit: "cover" }}
                        />
                      </div>

                      <div className="col-6">
                        <h5>{item.product.name || "Unnamed Product"}</h5>
                        <p>
                          {formatter(
                            Number(item.product.priceAfterDiscount) || 0
                          )}
                        </p>
                      </div>

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
                        <span>{Number(item.quantity) || 0}</span>
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
                  )
              )}
            </ul>
          )}
        </div>

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
              disabled={!cartItems.length}
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
