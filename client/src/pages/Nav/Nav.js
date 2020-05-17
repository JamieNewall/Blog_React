import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.light,
    height: "100px",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  navLinks: {
    width: "100%",
    color: theme.palette.text.primary
  },
  links: {
    "&:hover": {
      color: theme.palette.text.secondary,
      textDecoration: 'none'

    },
    marginRight: '20px',
    fontSize: theme.typography.fontSize,
    color: theme.palette.primary.contrastText
  },
}));

const Navbar = (props) => {
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
          <Link href={'/home'} variant={'body2'} className={classes.links}>{"Home"}</Link>
        </Grid>
        <Grid item>
          <Link href={'/about'} variant={'body2'} className={classes.links}>{"About"}</Link>
        </Grid>
        <Grid item>
          <Link href={'/edit'} variant={'body2'} className={classes.links}>{"Edit Posts"}</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
