const initialState = {
  info: {}, // Giá trị mặc định cho thông tin người dùng
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        info: action.payload, // Cập nhật thông tin người dùng
      };
    default:
      return state;
  }
};

export default userReducer;
