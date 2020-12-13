import {tokenAPI} from "../api/api";
const SET_TOKEN_FOR_VALIDATION =
  "test-assignment/authBranchInState/SSET_TOKEN_FOR_VALIDATION";
const SET_USER_NAME = "test-assignment/authBranchInState/SET_USER_NAME";
const LOGOUT = "test-assignment/authBranchInState/LOGOUT";
const SET_ERROR_TEXT = "test-assignment/authBranchInState/SET_ERROR_TEXT";

let initialState = {
  userName: localStorage.getItem("userName") || null,
  token: localStorage.getItem("token") || null,
  isAuth: localStorage.getItem("isAuthUser") === "true" ? true : false,
  error_text: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
        isAuth: true,
      };
    case SET_TOKEN_FOR_VALIDATION:
      return {
        ...state,
        token: action.apiToken,
      };
    case LOGOUT:
      return {
        ...state,
        userName: null,
        token: null,
        isAuth: false,
      };
    case SET_ERROR_TEXT:
      return {
        ...state,
        error_text: action.text,
      };
    default:
      return state;
  }
};
//action creators
export const setTokenSuccsess = (apiToken) => ({
  type: SET_TOKEN_FOR_VALIDATION,
  apiToken,
});
export const setUserName = (userName) => ({type: SET_USER_NAME, userName});
export const setErrorText = (text) => ({type: SET_ERROR_TEXT, text});
const logoutAC = () => ({type: LOGOUT});

//thunk creators
export const login = (userName, password) => async (dispatch) => {
  try {
    const response = await tokenAPI.getApiToken(userName, password);
    dispatch(setTokenSuccsess(response.token));
    dispatch(setUserName(userName));
    localStorage.setItem("token", response.token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("isAuthUser", true);
    return "OK";
  } catch (error) {
    dispatch(setErrorText(error.toString()));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutAC());
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("isAuthUser");
};

export default AuthReducer;
