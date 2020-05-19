/* eslint-disable */
import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme/Theme";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Nav/Nav";
import "typeface-roboto";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About/About";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { connect } from "react-redux";

function App({ isLoggedIn }) {
  console.log(isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Router>
        <Switch>
          <Route
              path={"/"}
              render={() => (isLoggedIn ? <Home /> : <Login />)}
          />
          <Route
            path={"/home"}
            render={() => (isLoggedIn ? <Home /> : <Login />)}
          />


          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/About"}>
            <About />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
