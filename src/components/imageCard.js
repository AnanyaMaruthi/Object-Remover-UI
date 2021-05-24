import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import image from "../images/sample.jpg";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

const ImageCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="Your Image (Input)"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" style={{ textAlign: "center" }}>
            Imaage
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
