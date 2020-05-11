import React from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Post = ({ postTitle, postBody }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"https://picsum.photos/345/140"}
          title={"Test Post"}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant={"h5"} component={"h2"}>
            {postTitle}
          </Typography>
          <Typography noWrap variant={"body2"} color={"textSecondary"} component={"p"}>
            {postBody}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size={"small"} color={"primary"}>
          Share
        </Button>
        <Button size={"small"} color={"primary"}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
