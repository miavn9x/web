// store.js
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer, // Kết hợp reducer giỏ hàng vào store
});

const store = createStore(rootReducer);

export default store;
