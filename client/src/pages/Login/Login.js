/* eslint-disable */
import React, {useState, useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gql from 'graphql-tag'
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks'
import {Redirect, BrowserRouter} from 'react-router-dom'

import {Query} from '@apollo/react-components'
import {connect} from 'react-redux'


const {useEffect} = require("react");

const useStyles = makeStyles(theme => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',

    },
    submit: {
        margin:theme.spacing(3,0,2),

    },
    warning: {
        color: "red"
    }
}))

function Copyright() {
    return (
        <Typography variant={'body2'}
                    color={'textSecondary'}
                    aligns={'center'}>
            {'Copyright ©'}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const LOGIN = gql`
    mutation login($input: credentials) {
        loginNow(input:$input) {
            token
            userId
        }
    }
`




const Login = ({isLoggedIn, loginWarning, changeLoginWarningToFalse,changeLoginWarningToTrue, changeLoginStatusToTrue, getState}) => {

    const classes = useStyles()
    const client = useApolloClient()


    const [login] = useMutation(LOGIN)


    const [state, setState] = useState({email:'',password:''})

    const msgTimer = () => {
        setTimeout(function() {
        changeLoginWarningToFalse()
        },4000)
    }

    const signIn = async (e, client) => {
        e.preventDefault()


        if (!validateEmail() || !validatePassword()) {
            return 'invalid email or password'
        }
        const {data} = await login({variables: {input: {email: state.email, password: state.password}}})
        console.log(data)
        if(data.loginNow.token === null) {

           await changeLoginWarningToTrue()
            msgTimer()
        }
        if(data.loginNow.token !== null){

            await changeLoginStatusToTrue()

            saveUserData(data.loginNow.token)
            // BrowserHistory.push('/')
            // window.location.href = 'http://localhost:3000/'

        }


    }
    //TODO
    const validateEmail = () => {
        return true
    }
    //TODO
    const validatePassword = () => {
        return true
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]:e.target.value})
    }


    const saveUserData = token => {
        localStorage.setItem("AUTH_TOKEN", token)
    }

    if (isLoggedIn) {
        return (

                <Redirect to={'/'}/>

        )
    }


    return (


        <React.Fragment>

        <Container className={classes.root} maxWidth={"xs"}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component={'h1'} variant={'h5'}>
                    Sign In
                </Typography>

                { loginWarning &&
                        <Box className={classes.warning}>{'We do not recognise that user or password, please recheck your credentials'}</Box>

                }




                <form className={classes.form} noValidate>
                    <TextField
                        variant={"outlined"}
                        margin={'normal'}
                        required
                        fullWidth
                        error={loginWarning}
                        helperText={loginWarning ? 'Please verify your email was entered correctly.' : ''}
                        onChange={handleChange}
                        value={state.email}
                        id={'email'}
                        label={'email address'}
                        name={'email'}
                        autoComplete={'email'}
                        autoFocus/>

                    <TextField
                        variant={'outlined'}
                        margin= {'normal'}
                        required
                        fullWidth
                        error={loginWarning}
                        helperText={loginWarning ? 'Please verify your password is correct.' : ''}
                        onChange={handleChange}
                        value={state.password}
                        id={'password'}
                        label={'password'}
                        name={'password'}
                        type={'password'}
                        autoComplete={'current-password'}/>

                    <FormControlLabel
                        control={<Checkbox value={'remember'} color={'primary'}/>}
                        label={'Remember Me'}/>
                    <Button
                        type={'submit'}
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={(e) => signIn(e, client)}
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container >
                        <Grid item xs>
                            <Link href={'#'} variant={'body2'}>
                                Forgot Password?
                            </Link>
                        </Grid>
                        <Grid item  >
                            <Link href={'#'} variant={'body2'}>
                                {"Dont have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
        </React.Fragment>


    )
};


const mapStateToProps = (state) => ({
    isLoggedIn : state.isLoggedIn,
    loginWarning: state.loginWarning
})

const mapDispatchToProps = (dispatch) => ({
        changeLoginWarningToFalse: () => dispatch({type:'CHANGE_LOGIN_WARNING_FALSE'}),
    changeLoginWarningToTrue: () => dispatch({type:'CHANGE_LOGIN_WARNING_TRUE'}),
    changeLoginStatusToTrue : () => dispatch({type:'CHANGE_LOGIN_STATUS_TRUE'}),
    getState : () => dispatch({type: 'DEFAULT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);