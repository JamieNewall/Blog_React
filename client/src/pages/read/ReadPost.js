import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: "10px",
    marginTop: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    marginTop: "20px",
    fontSize: "2rem",
  },
  headerImage: {
    width: "800px",
    height: "250px",
    backgroundColor: "gray",
    marginTop: "20px",
  },
}));

const getSpecificPostQuery = gql`
  query getSpecific($postId: String) {
    getSpecificPost(postId: $postId) {
      postTitle
      postContent
      tags
    }
  }
`;

const ReadPost = ({}) => {
  const classes = useStyles();
  let { id } = useParams();

  return (
    <Container className={classes.container}>
      <Query query={getSpecificPostQuery} variables={{ postId: id }}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress />;
          if (error) return `Something Went Wrong. ${error}`;

          return (
            <Box className={classes.container}>
              <Box>
                <Typography className={classes.title}>
                  {data.getSpecificPost.postTitle}
                </Typography>
              </Box>
              <Box>
                <Typography className={classes.paragraph}>
                  {data.getSpecificPost.postContent}
                </Typography>
              </Box>
            </Box>
          );
        }}
      </Query>
    </Container>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReadPost);
