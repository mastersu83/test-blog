const initialState = {
  user: {},
  isAuth: false,
  errorText: "",
  isFetching: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    case "LOGIN":
      return { ...state, ...action.payload };
    case "SET_ERROR_TEXT":
      return { ...state, errorText: action.payload };
    case "TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.payload };
    }
    default:
      return state;
  }
};
