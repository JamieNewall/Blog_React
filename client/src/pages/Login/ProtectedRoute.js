import React, {useLayoutEffect} from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const {useEffect} = require("react");

const ProtectedRoute = ({Component,isLoggedIn, ...rest}) => {


    useLayoutEffect(()=>{
        console.log('I ran use Effect')
    },[])


    console.log('Protected route hit', `login status: ${isLoggedIn}`)


    return (
        <Route {...rest} render={(props) => {

            if (isLoggedIn) {
                return <Component/>
            } else {
                return <Redirect to={{pathname: '/login',

                }}/>
            }
        }}/>


            ) }


const mapStateToProps = (state) => ({
    isLoggedIn : state.isLoggedIn
})

export default connect(mapStateToProps, null)(ProtectedRoute);