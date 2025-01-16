import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { thunk } from "redux-thunk";

import { cartReducer } from "./reducers/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer, // Giỏ hàng
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
