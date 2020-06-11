/* eslint-disable */
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme/Theme";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Nav/Nav";
import EditPost from "./pages/edit_post/EditPost";
import "typeface-roboto";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import addPost from "./pages/add/addPost";
import AllPosts from "./pages/all_posts/AllPosts";
import ReadPost from "./pages/read/ReadPost";
import CreateAccount from "./pages/Login/CreateAccount"

function App({ isLoggedIn }) {

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Switch>
        <ProtectedRoute Component={Home} exact path={"/"} />
        <ProtectedRoute Component={Home} exact path={"/home"} />
        <ProtectedRoute Component={addPost} exact path={"/add_post"} />
        <ProtectedRoute Component={AllPosts} exact path={"/all_posts"} />
        <ProtectedRoute Component={EditPost} exact path={"/edit_post/:id"} />
        <ProtectedRoute Component={ReadPost} exact path={"/post/:id"} />

        <Route exact path={"/login"}>
          <Login />
        </Route>

        <Route exact path={"/create_account"}>
          <CreateAccount />
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
