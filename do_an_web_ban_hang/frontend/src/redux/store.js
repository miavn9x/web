// redux/store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Giả sử bạn đã có reducer

const store = createStore(
  rootReducer, // Reducer của bạn
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Để sử dụng Redux DevTools trong trình duyệt
);

export default store;
