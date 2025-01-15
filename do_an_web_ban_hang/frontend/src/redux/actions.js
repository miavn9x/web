// src/redux/actions.js

export const addToCart = (product, quantity) => {
  return {
    type: "ADD_TO_CART",
    payload: { product, quantity },
  };
};

export const addToFavorites = (product) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: product,
  };
};
//

