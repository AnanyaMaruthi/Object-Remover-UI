import ImageCard from "./imageCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: theme.spacing(5),
    paddingTop: theme.spacing(10),
  },
}));

const ImageTransformer = () => {
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <ImageCard />
      <ImageCard />
    </div>
  );
};

export default ImageTransformer;
