//src/ redux1/reducers/favoriteReducer.js
import { FAVORITE_ACTIONS } from "../constants/actionTypes";

const initialState = {
  items: [],
};

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_ACTIONS.ADD_TO_FAVORITES:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case FAVORITE_ACTIONS.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case FAVORITE_ACTIONS.SET_FAVORITES:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
