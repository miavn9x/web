// src/redux/actions/cartActions.js

// Action to remove item from the cart
export const removeItemFromCart = (productId) => ({
  type: "REMOVE_ITEM",
  payload: productId,
});

// Action to update the quantity of an item in the cart
export const updateItemQuantity = (productId, quantityChange) => ({
  type: "UPDATE_QUANTITY",
  payload: { productId, quantityChange },
});
