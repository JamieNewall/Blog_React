import React from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardContent: {
    width: "100%",
  },
  title: {
    fontSize: "1rem",
    width: "100%",
    display: "block",
  },
}));

const Post = ({ postTitle, postBody, postId }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"https://picsum.photos/345/140"}
          title={"Test Post"}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant={"h6"}
            align={"left"}
            component={"p"}
            className={classes.title}
          >
            {postTitle}
          </Typography>
          <Typography
            noWrap
            variant={"body2"}
            color={"textSecondary"}
            component={"p"}
            align={"center"}
          >
            {postBody}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
