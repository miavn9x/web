// src/redux/actions/index.js (hoặc tệp tương tự)
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product, // Dữ liệu sản phẩm cần thêm vào giỏ hàng
  };
};
