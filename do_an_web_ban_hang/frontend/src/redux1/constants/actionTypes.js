

// src/redux1/constants/actionTypes.js
export const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART_QUANTITY: "UPDATE_CART_QUANTITY",
  SET_CART: "SET_CART",
};

export const FAVORITE_ACTIONS = {
  ADD_TO_FAVORITES: "FAVORITES_ADD_TO_FAVORITES", // Thêm sản phẩm vào yêu thích
  REMOVE_FROM_FAVORITES: "FAVORITES_REMOVE_FROM_FAVORITES", // Xóa sản phẩm khỏi yêu thích
  SET_FAVORITES: "FAVORITES_SET_FAVORITES", // Đặt danh sách yêu thích
};
