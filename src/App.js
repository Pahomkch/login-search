import React from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login, logout} from "./Redux/AuthReducer";
import {
  getUserName,
  getUserToken,
  getIsAuthUser,
  getErrorText,
  getUsersFromState,
} from "./Redux/Selectors/selectors";
import {getUsers} from "./Redux/UsersReducer";
import Login from "./Components/Login/Login";
import Users from "./Components/Users";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  app: {
    height: "90vh",
    margin: 10,
    display: "flex",
    justifyContent: "center",
  },
});
function App({login, isAuth, errorText, logout, users, getUsers}) {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/login-form">
          <Login login={login} isAuth={isAuth} errorText={errorText} />
        </Route>
        <Route path="/">
          <Users isAuth={isAuth} logout={logout} users={users} getUsers={getUsers} />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userName: getUserName(state),
  token: getUserToken(state),
  errorText: getErrorText(state),
  isAuth: getIsAuthUser(state),
  users: getUsersFromState(state),
});

App.propTypes = {
  isAuth: PropTypes.bool,
  errorText: PropTypes.string,
  users: PropTypes.array,
  login: PropTypes.func,
  logout: PropTypes.func,
  getUsers: PropTypes.func,
};

export default connect(mapStateToProps, {login, logout, getUsers})(App);
