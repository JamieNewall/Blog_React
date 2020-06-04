import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.light,
    height: "100px",
    width: "100vw",
    display: "flex",
    justifyContent: "flex-end",
  },
  navLinks: {
    color: theme.palette.text.primary,
    padding: 0,
    width: "100%",
    height: "100%",
    margin: 0,
  },
  links: {
    marginRight: "40px",
    fontSize: theme.typography.fontSize,
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.text.secondary,
      textDecoration: "none",
    },
  },
}));

const Navbar = ({ props, isLoggedIn, logout }) => {
  const classes = useStyles();

  return (
    <Box component={"nav"} className={classes.nav}>
      <CssBaseline />

      <Grid
        container
        justify={"flex-end"}
        alignItems={"center"}
        spacing={3}
        className={classes.navLinks}
      >
        <Grid item>
          <Link className={classes.links} to={"/home"}>
            Home
          </Link>
        </Grid>

        {isLoggedIn && (
          <Grid item>
            <Link className={classes.links} to={"/add_post"}>
              Add Post
            </Link>
          </Grid>
        )}

        {isLoggedIn && (
          <Grid item>
            <Link className={classes.links} to={"/all_posts"}>
              Edit Posts
            </Link>
          </Grid>
        )}

        {isLoggedIn && (
            <Grid item>
              <Link className={classes.links} onClick={()=>logout()}  >
                Logout
              </Link>
            </Grid>
        )}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({type:'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
