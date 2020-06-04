/* eslint-disable */
import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { useApolloClient, useMutation} from "@apollo/react-hooks";
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_ID_IN_STATE } from "../../redux/actions";

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



const LOGIN = gql`
    mutation login($input: credentials) {
        loginNow(input: $input) {
            token
            userId
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

               }) => {
    const classes = useStyles();
    const client = useApolloClient();

    const [login] = useMutation(LOGIN);

    const [state, setState] = useState({ email: "", password: "" });

    const msgTimer = () => {
        setTimeout(function () {
            changeLoginWarningToFalse();
        }, 4000);
    };

    const signIn = async (e, client) => {
        e.preventDefault();

        const { data } = await login({
            variables: { input: { email: state.email, password: state.password } },
        });
        console.log(data);
        if (data.loginNow.token === null) {
            await changeLoginWarningToTrue();
            msgTimer();
        }
        if (data.loginNow.token !== null) {
            await setUserIdInState(data.loginNow.userId);
            await changeLoginStatusToTrue();

            saveUserData(data.loginNow.token);
        }
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const saveUserData = (token) => {
        localStorage.setItem("AUTH_TOKEN", token);
    };

    if (isLoggedIn) {
        return <Redirect to={"/"} />;
    }

    return (
        <React.Fragment>
            <Container className={classes.root} maxWidth={"xs"}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component={"h1"} variant={"h5"}>
                        Create Account
                    </Typography>

                    {loginWarning && (
                        <Box className={classes.warning}>
                            {
                                "We do not recognise that user or password, please recheck your credentials"
                            }
                        </Box>
                    )}

                    <form className={classes.form} noValidate>
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            required
                            fullWidth
                            error={loginWarning}
                            helperText={
                                loginWarning
                                    ? "Please verify your email was entered correctly."
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
                            error={loginWarning}
                            helperText={
                                loginWarning ? "Please verify your password is correct." : ""
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
                            onClick={(e) => signIn(e, client)}
                            className={classes.submit}
                        >
                            Sign In
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
    userId: state.userId,
});

const mapDispatchToProps = (dispatch) => ({
    changeLoginWarningToFalse: () =>
        dispatch({ type: "CHANGE_LOGIN_WARNING_FALSE" }),
    changeLoginWarningToTrue: () =>
        dispatch({ type: "CHANGE_LOGIN_WARNING_TRUE" }),
    changeLoginStatusToTrue: () => dispatch({ type: "CHANGE_LOGIN_STATUS_TRUE" }),
    getState: () => dispatch({ type: "DEFAULT" }),
    setUserIdInState: (payload) => dispatch(SET_USER_ID_IN_STATE(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
