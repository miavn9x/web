// src/redux/reducers/cartReducer.js

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product._id !== action.payload
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product._id === action.payload.productId
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantityChange,
              }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
