import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const src = require("../../assets/Vorderrhein.svg");

const useStyles = makeStyles((theme) => ({
  img: {
    width: "60%",
    height: "100%",
  },
  backgroundImg: {
    backgroundImage: `url(${src})`,
    height: '100vh'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridTemplateRows: 'repeat(1,1fr)'

  },
  gridItem: {
    gridColumnStart: 3,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 3,
    height: '400px',
    width: '400px'
  },
  gridTextItem: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1
  }
}));

const About = (props) => {
  const classes = useStyles();

  return (

    <Container maxWidth={"lg"} className={classes.backgroundImg}>
      <CssBaseline/>
      <Box className={classes.grid}>

          <Box mt={3} padding={"10px"} className={classes.gridTextItem}>
            <Typography
              component={"p"}
              variant={"body2"}
              color={"textSecondary"}
              aligns={"center"}
            >
              {`A blog to charter my journey as a self taught programmer focusing on Javascript and web technologies.            

                The good , the bad and the ugly, the aim is to showcase a raw representation of what it is really like to learn to code and to showcase the ups and downs that come with it.

                I hope you enjoy it and it helps other people wishing to learn to code.`}
            </Typography>
          </Box>

        <Box className={classes.gridItem}>

        </Box>
      </Box>
    </Container>
  );
};

export default About;
