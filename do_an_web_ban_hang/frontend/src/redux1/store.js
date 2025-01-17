import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./reducers/userReducer"; // Import userReducer
import { cartReducer } from "./reducers/cartReducer"; // Nếu có cartReducer

const rootReducer = combineReducers({
  user: userReducer, // Thêm userReducer vào rootReducer
  cart: cartReducer, // Giả sử bạn cũng có cartReducer
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
