export const getUserName = (state) => state.authentication.userName;
export const getUserToken = (state) => state.authentication.token;
export const getIsAuthUser = (state) => state.authentication.isAuth;
export const getErrorText = (state) => state.authentication.error_text;

export const getUsersFromState = (state) => state.users.users;
