// cartReducer.js
import { CART_ACTIONS } from "../constants/actionTypes";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  total: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === product._id
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          product: {
            ...product,
            image:
              product.image ||
              (product.images && product.images[0]) ||
              "https://via.placeholder.com/150",
          },
          quantity,
        };
        updatedItems = [...state.items, newItem];
      }

      const total = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return {
        ...state,
        items: updatedItems,
        total,
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(
        (item) => item.product._id !== action.payload
      );

      const total = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return {
        ...state,
        items: updatedItems,
        total,
      };
    }

    case CART_ACTIONS.UPDATE_CART_QUANTITY: {
      const { productId, quantity } = action.payload;

      const updatedItems = state.items.map((item) =>
        item.product._id === productId
          ? {
              ...item,
              quantity: Math.max(1, quantity), // Đảm bảo số lượng tối thiểu là 1
            }
          : item
      );

      const total = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return {
        ...state,
        items: updatedItems,
        total,
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      localStorage.removeItem("cartItems");
      return {
        ...initialState,
        items: [],
        total: 0,
      };
    }

    default:
      return state;
  }
};
