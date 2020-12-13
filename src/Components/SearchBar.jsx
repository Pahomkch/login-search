import React from "react";
import PropTypes from "prop-types";
import {Button, FormControl, InputLabel, Input, InputAdornment} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import HeightIcon from "@material-ui/icons/Height";

function SearchBar(props) {
  const {textSearch, changeSearchInput, toSortByID, logoutUser} = props;
  return (
    <Grid container justify="center" spacing={0}>
      <FormControl style={{flexGrow: 1}}>
        <InputLabel htmlFor="search-user">Search user</InputLabel>
        <Input
          id="search-user"
          value={textSearch}
          onChange={changeSearchInput}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Grid item>
        <Button variant="contained" onClick={toSortByID} startIcon={<HeightIcon />}>
          Sort by ID
        </Button>
        <Button variant="contained" color="secondary" onClick={logoutUser}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

SearchBar.propTypes = {
  textSearch: PropTypes.string,
  changeSearchInput: PropTypes.func,
  logoutUser: PropTypes.func,
  toSortByID: PropTypes.func,
};

export default SearchBar;
