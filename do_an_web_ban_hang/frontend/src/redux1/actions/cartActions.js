import { CART_ACTIONS } from "../constants/actionTypes";

export const addToCart = (product, quantity) => {
  console.log("Gọi hàm addToCart với:", { product, quantity });

  if (!product || !product._id) {
    console.error("Sản phẩm không hợp lệ hoặc thiếu ID:", product);
    return {
      type: "ERROR",
      payload: "Sản phẩm không hợp lệ hoặc thiếu ID.",
    };
  }

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    console.error("Số lượng không hợp lệ:", quantity);
    return {
      type: "ERROR",
      payload: "Số lượng không hợp lệ.",
    };
  }

  // Đảm bảo hình ảnh đầu tiên luôn tồn tại
  const image =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null;

  return {
    type: CART_ACTIONS.ADD_TO_CART,
    payload: { product: { ...product, image }, quantity },
  };
};

export const loadCartFromLocalStorage = () => {
  return (dispatch) => {
    const cart = localStorage.getItem("cart");
    try {
      const parsedCart = cart ? JSON.parse(cart) : null;
      if (parsedCart) {
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: parsedCart,
        });
      }
    } catch (error) {
      console.error("Lỗi khi phân tích giỏ hàng từ localStorage:", error);
    }
  };
};

export const removeFromCart = (productId) => ({
  type: CART_ACTIONS.REMOVE_FROM_CART,
  payload: productId,
});

// cartActions.js
export const updateCartQuantity = (productId, quantity) => {
  return {
    type: CART_ACTIONS.UPDATE_CART_QUANTITY,
    payload: {
      productId,
      quantity: Math.max(1, quantity) // Đảm bảo số lượng tối thiểu là 1
    }
  };
};

export const clearCart = () => ({
  type: CART_ACTIONS.CLEAR_CART,
});
