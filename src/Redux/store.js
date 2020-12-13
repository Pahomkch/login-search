import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import AuthReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import UsersReducer from "./UsersReducer";

let allReducers = combineReducers({
  authentication: AuthReducer,
  users: UsersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
