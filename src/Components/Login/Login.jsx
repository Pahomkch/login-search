import React from "react";
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import {Grid, makeStyles, Typography} from "@material-ui/core/";
import {PropTypes} from "prop-types";

const useStyle = makeStyles({
  view: {
    height: "100%",
    width: 400,
  },
});

export default function Login(props) {
  const {login, isAuth, errorText} = props;
  const classes = useStyle();
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Grid direction="column" container justify="center" className={classes.view}>
      <Typography variant="h3" component="h2" align="center">
        PLEASE LOGIN
      </Typography>
      <LoginForm login={login} errorText={errorText} />
    </Grid>
  );
}

Login.propTypes = {
  login: PropTypes.func,
  isAuth: PropTypes.bool,
  errorText: PropTypes.string,
};
