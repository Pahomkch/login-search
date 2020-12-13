import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import OneUser from "./OneUser";
import SearchBar from "./SearchBar";

function Users(props) {
  const {isAuth, logout, users, getUsers} = props;
  useEffect(() => {
    isAuth && getUsers();
  }, [isAuth, getUsers]);
  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const [allUsers, setAllUsers] = useState([]);
  const [userSortedMinToMax, setUserSortedMinToMax] = useState(null);
  const [textSearch, setTextSearch] = useState("");

  const changeSearchInput = (e) => {
    setTextSearch(e.target.value);
    setAllUsers(
      users.filter((user) => {
        return user.username.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      })
    );
  };

  const logoutUser = () => {
    logout();
  };

  const toSortByID = () => {
    if (userSortedMinToMax) {
      const sortedArray = [...allUsers].sort((a, b) => b.id - a.id);
      setAllUsers(sortedArray);
      setUserSortedMinToMax(false);
    } else {
      const sortedArray = [...allUsers].sort((a, b) => a.id - b.id);
      setAllUsers(sortedArray);
      setUserSortedMinToMax(true);
    }
  };

  if (!isAuth) {
    return <Redirect to="/login-form" />;
  }

  return (
    <Grid container direction="row" justify="center" spacing={0}>
      <SearchBar
        textSearch={textSearch}
        changeSearchInput={changeSearchInput}
        logoutUser={logoutUser}
        toSortByID={toSortByID}
      />

      {allUsers.length === 0 && !textSearch && <h2>...Loading users</h2>}
      {allUsers.length === 0 && textSearch && <h2>Users not found</h2>}

      {allUsers && allUsers.map((u) => <OneUser key={u.id} user={u} />)}
    </Grid>
  );
}

Users.propTypes = {
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

export default Users;
