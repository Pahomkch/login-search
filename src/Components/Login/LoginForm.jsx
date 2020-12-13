import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {PropTypes} from "prop-types";

const useStyle = makeStyles({
  displayBlock: {
    position: "absolute",
    textAlign: "center",
    left: 0,
    top: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    zIndex: 3,
    opacity: 0.6,
  },
});
function LoginForm({login, errorText}) {
  const {handleSubmit, control, errors} = useForm();
  const classes = useStyle();
  const [password, setPassword] = useState({
    passwordText: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async ({userName, password}) => {
    try {
      setLoading(true);
      await login(userName, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error in LoginForm component level");
    }
  };
  const handleChangePasswordInput = (e) => {
    setPassword({
      ...password,
      passwordText: e.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading && <div className={classes.displayBlock}>Loading...</div>}
      <Grid container direction="column" align="center">
        <Controller
          fullWidth
          name="userName"
          as={
            <TextField
              helperText={errors.userName ? errors.userName.message : null}
              label="Username"
              error={errors.userName || errorText}
            />
          }
          control={control}
          defaultValue=""
          rules={{
            required: true,
            maxLength: 150,
            pattern: {
              value: /^[\w.@+-]+$/i,
              message: "Enter a valid username",
            },
          }}
        />
        {errors.userName && <p>{errors.userName.message}</p>}
        <Controller
          fullWidth
          name="password"
          as={
            <FormControl>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <Input
                error={errors.password || errorText}
                helpertext={errors.password ? errors.password.message : null}
                id="password-input"
                type={password.showPassword ? "text" : "password"}
                value={password.passwordText}
                onChange={handleChangePasswordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {password.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          }
          control={control}
          defaultValue=""
          rules={{
            required: true,
            maxLength: 128,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{8,}$/i,
              message: "Password is not valide",
            },
          }}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Grid>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func,
  errorText: PropTypes.string,
};

export default LoginForm;
