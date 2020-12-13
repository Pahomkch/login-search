import {getUserToken} from "./Selectors/selectors";
import {usersAPI} from "../api/api";
import {setErrorText} from "./AuthReducer";

const SET_USERS = "test-assignment/authBranchInState/SET_USERS";

let initialState = {
  users: [],
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};
//action creators
export const setUsersSuccsess = (users) => ({type: SET_USERS, users});

//thunk creators
export const getUsers = () => async (dispatch, getState) => {
  const tokenCurrentUser = getUserToken(getState());
  try {
    const response = await usersAPI.getUsers(tokenCurrentUser);
    dispatch(setUsersSuccsess(response));
  } catch (error) {
    dispatch(setErrorText(error.toString()));
  }
};

export default UsersReducer;
