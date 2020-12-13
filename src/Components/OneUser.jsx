import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, Typography} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    width: 150,
    height: 150,
    margin: 5,
  },
  paper: {
    color: theme.palette.text.primary,
  },
  id: {
    textAlign: "right",
  },
  name: {
    color: theme.palette.primary.dark,
  },
}));

function OneUser(props) {
  const classes = useStyles();
  const {id, username, first_name, last_name} = props.user;

  return (
    <Card m={8} className={classes.root}>
      <CardContent>
        <Typography
          className={`${classes.paper} ${classes.id}`}
          variant="h6"
          component="h4"
        >
          {id}
        </Typography>
        <Typography className={`${classes.paper} ${classes.name}`}>{username}</Typography>
        {first_name && (
          <Typography className={classes.paper} variant="subtitle2" component="p">
            {first_name}
          </Typography>
        )}
        {last_name && (
          <Typography className={classes.paper} variant="subtitle2" component="p">
            {last_name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

OneUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default OneUser;
