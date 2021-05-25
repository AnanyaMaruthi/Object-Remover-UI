import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// todo: add onclick ripple effect
// references:
// passing props to styles: https://stackoverflow.com/questions/48879517/passing-props-to-material-ui-style/51036613#51036613
// on click ripple effect: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `1px 1px 10px 5px #EFEFEF, 
                -1px -1px 10px 5px #EFEFEF`,
    cursor: (props) => (props.clickable ? "pointer" : "default"),

    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  caption: {
    padding: theme.spacing(1, 2),
    // textAlign: "right",
  },
}));

const Image = ({ image, height, width, caption, clickable, onClick }) => {
  const classes = useStyles({ clickable });
  return (
    <div
      className={classes.root}
      onClick={() => {
        if (clickable) {
          onClick();
        }
      }}
    >
      <div style={{ height: height, width: width }}>{image}</div>

      {caption && (
        <div className={classes.caption}>
          <Typography variant="caption">{caption}</Typography>
        </div>
      )}
    </div>
  );
};

export default Image;
