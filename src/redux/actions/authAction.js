import { authApi, currentInstance } from "../../api/api";

export const setAuthAction = (user, isAuth) => ({
  type: "SET_AUTH",
  payload: {
    user,
    isAuth,
  },
});

export const setErrorText = (errorText) => ({
  type: "SET_ERROR_TEXT",
  payload: errorText,
});

export const isFetchingAction = (isFetching) => ({
  type: "TOGGLE_IS_FETCHING",
  payload: isFetching,
});

export const isRegisterThunk =
  (email, password, fullName) => async (dispatch) => {
    try {
      await authApi.register(email, password, fullName);
      dispatch(setErrorText("Вы зарегистрировались, можете войти"));
    } catch (e) {
      dispatch(setErrorText("Введите корректрый Email"));
    }
  };

export const isLoginThunk = (email, password) => async (dispatch) => {
  try {
    let resp = await authApi.login(email, password);
    localStorage.setItem("token", resp.data.token);
    dispatch(setAuthAction(resp.data, true));
    currentInstance();
  } catch (e) {
    dispatch(setErrorText("Неверный логин или пароль"));
  }
};
export const authMeThunk = () => async (dispatch) => {
  try {
    let resp = await authApi.authMe();
    dispatch(setAuthAction(resp.data, true));
  } catch (e) {
    console.log(e.message);
  }
};
export const logOutThunk = () => (dispatch) => {
  localStorage.clear();
  dispatch(setAuthAction({}, false));
  currentInstance();
};
