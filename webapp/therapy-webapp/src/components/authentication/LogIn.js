import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withIndex from "../withIndex";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { instance, instance_authenticated } from "../../api/axios/axios-config";

const useStyles = makeStyles((theme) => ({
  loginFormItem: {
    margin: theme.spacing(1),
  },
}));

const LogIn = (props) => {
  useEffect(() => {
    if (localStorage.getItem("user") != null) props.history.push("/home");
  });

  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeemail = (e) => {
    setemail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.showLoading();
    try {
      await props.startLogInUser({ email, password });
    } catch (err) {
      console.log(err);
    }
    props.hideLoading();

    console.log("USER: ");
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user") != null) props.history.push("/home");
  };
  return (
    <>
      <Grid item sm={3} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.loginFormItem}
            onChange={handleChangeemail}
            color="primary"
            type="text"
            fullWidth
            value={email}
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.loginFormItem}
            onChange={handleChangePassword}
            color="primary"
            type="password"
            fullWidth
            value={password}
            label="Password"
            variant="outlined"
          />
          <Button
            type="submit"
            className={classes.loginFormItem}
            color="primary"
            variant="contained"
            fullWidth
          >
            Log In
          </Button>
        </form>
      </Grid>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(withIndex(LogIn));
