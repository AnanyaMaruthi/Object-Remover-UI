import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    boxShadow: `1px 1px 10px 5px #EFEFEF, 
                -1px -1px 10px 5px #EFEFEF`,

    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
});

const Image = ({ image, height, width }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ height: height, width: width }}>
      {image}
    </div>
  );
};

export default Image;
