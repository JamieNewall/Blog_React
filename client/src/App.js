/* eslint-disable */
import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme/Theme";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Nav/Nav";
import "typeface-roboto";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import About from "./pages/About/About";
import { connect } from "react-redux";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import addPost from './pages/add/addPost'

function App({ isLoggedIn }) {
  console.log(isLoggedIn);

  return (

      <ThemeProvider theme={theme}>
        <Navbar />

        <Switch>
          <ProtectedRoute Component={Home} exact path={"/"} />
          <ProtectedRoute Component={Home} exact path={"/home"} />
         <ProtectedRoute Component={addPost} exact path={"/add_post"} />
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/about"}>
            <About />
          </Route>
        </Switch>

      </ThemeProvider>

  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
