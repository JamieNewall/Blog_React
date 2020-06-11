/* eslint-disable */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_ID_IN_STATE } from "../../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const { useEffect } = require("react");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  warning: {
    color: "red",
  },
}));

const CREATE_USER = gql`
  mutation createUserAccount($user: createUser) {
    createUserAccount(user: $user) {
      email
    }
  }
`;

const CreateAccount = ({
  isLoggedIn,
  loginWarning,
  changeLoginWarningToFalse,
  changeLoginWarningToTrue,
  changeLoginStatusToTrue,
  setUserIdInState,
  changeCreateAccountWarningToTrue,
  changeCreateAccountWarningToFalse,
  createAccountWarning,
  setAccountCreatedSuccess,
  accountCreatedSuccess,
}) => {
  const classes = useStyles();
  const client = useApolloClient();

  const [createUser] = useMutation(CREATE_USER);
  const [state, setState] = useState({ email: "", password: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const msgTimer = () => {
    setTimeout(function () {
      changeCreateAccountWarningToFalse();
    }, 4000);
  };

  const checkEmailValid = () => {
    const email = state.email;
    return /\S+@\S+\.\S+/.test(email);
  };

  const checkPasswordValid = () => {
    const alpha = /^(?:[0-9]+[a-z]|[a-z]+[0-9])/i.test(state.password);
    const len = /\w{8,}/.test(state.password);

    let res;

    if (len && alpha) {
      res = true;
    } else {
      res = false;
    }

    return res;
  };

  const createUserAccount = async (e, client) => {
      e.preventDefault();
    const emailValid = checkEmailValid();
    const passwordValid = checkPasswordValid();
    if (!emailValid || !passwordValid) {
      changeCreateAccountWarningToTrue();
      msgTimer();

    } else {

        const { data, error, loading } = await createUser({
            variables: { user: { email: state.email, password: state.password } },
        });

        if (error) throw error;
        if (loading) {
            return <CircularProgress />;
        }

        if (data.createUserAccount.email === "already exists") {
            console.log(data.createUserAccount);
            setUserAlreadyExists(true);
            setUserAlreadyExists(false);
        } else if (data.createUserAccount.email === null) {
            alert("Something went wrong. ");
        } else {
            // setSubmitSuccess(true)
            setAccountCreatedSuccess();
        }
    }


    }



  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  if (accountCreatedSuccess) {
    return <Redirect to={"/login"} />;
  }

  return (
    <React.Fragment>
      <Container className={classes.root} maxWidth={"xs"}>
        <CssBaseline />

        {userAlreadyExists &&
          enqueueSnackbar("User Already Exists!", { variant: "error" })}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={"h1"} variant={"h5"}>
            Create Account
          </Typography>

          {createAccountWarning && (
            <Box className={classes.warning}>
              {"Please enter a valid email address and/or password."}
            </Box>
          )}

          <form className={classes.form} noValidate>
            <TextField
              variant={"outlined"}
              margin={"normal"}
              required
              fullWidth
              error={createAccountWarning}
              helperText={
                createAccountWarning
                  ? "Please Enter a valid email address."
                  : ""
              }
              onChange={handleChange}
              value={state.email}
              id={"email"}
              label={"email address"}
              name={"email"}
              autoComplete={"email"}
              autoFocus
            />

            <TextField
              variant={"outlined"}
              margin={"normal"}
              required
              fullWidth
              error={createAccountWarning}
              helperText={
                createAccountWarning
                  ? "Please make sure password is atleast 8 characters long, with a mixture of letters and numbers."
                  : ""
              }
              onChange={handleChange}
              value={state.password}
              id={"password"}
              label={"password"}
              name={"password"}
              type={"password"}
              autoComplete={"current-password"}
            />

            <Button
              type={"submit"}
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={(e) => createUserAccount(e, client)}
              className={classes.submit}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item>
                <Link href={"/login"} variant={"body2"}>
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  loginWarning: state.loginWarning,
  createAccountWarning: state.createAccountWarning,
  userId: state.userId,
  accountCreatedSuccess: state.accountCreatedSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginWarningToFalse: () =>
    dispatch({ type: "CHANGE_LOGIN_WARNING_FALSE" }),
  changeLoginWarningToTrue: () =>
    dispatch({ type: "CHANGE_LOGIN_WARNING_TRUE" }),
  changeLoginStatusToTrue: () => dispatch({ type: "CHANGE_LOGIN_STATUS_TRUE" }),
  getState: () => dispatch({ type: "DEFAULT" }),
  setUserIdInState: (payload) => dispatch(SET_USER_ID_IN_STATE(payload)),
  changeCreateAccountWarningToTrue: () =>
    dispatch({ type: "CHANGE_CREATE_ACCOUNT_WARNING_TO_TRUE" }),
  changeCreateAccountWarningToFalse: () =>
    dispatch({ type: "CHANGE_CREATE_ACCOUNT_WARNING_TO_FALSE" }),
  setAccountCreatedSuccess: () => dispatch({ type: "ACCOUNT_CREATED" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
