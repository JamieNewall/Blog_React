/* eslint-disable */
import React from "react";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import theme from './Theme/Theme'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Navbar from './pages/Nav/Nav'
import 'typeface-roboto'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import About from './pages/About/About'
import {ApolloProvider} from '@apollo/react-hooks'



function App() {

  return (

        <ThemeProvider theme={theme}>
            <Navbar/>
            <Router>
            <Switch>
                <Route path={'/home'}>
                    <Home/>
                </Route>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <Route path={'/About'}>
                    <About/>
                </Route>

            </Switch>
            </Router>
        </ThemeProvider>

      )
}

export default App;
