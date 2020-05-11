import React from "react";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import theme from './Theme/Theme'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Nav from './pages/Nav/Nav'
import 'typeface-roboto'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'



function App() {

  return (
        <ThemeProvider theme={theme}>
            <Nav/>
            <Router>
            <Switch>
                <Route path={'/home'}>
                    <Home/>
                </Route>
                <Route path={'/login'}>
                    <Login/>
                </Route>

            </Switch>
            </Router>
        </ThemeProvider>
      )
}

export default App;
