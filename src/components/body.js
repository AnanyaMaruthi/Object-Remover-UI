import React from "react";
import Image from "./Image";
import { makeStyles } from "@material-ui/core/styles";
import ImageResizeModal from "./ImageResizeModal";
import { Box, Button, Typography } from "@material-ui/core";
import sampleImage from "../images/sample.jpg";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: theme.spacing(5),
    paddingTop: theme.spacing(10),
  },

  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(5),
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(3),
  },
}));

const Body = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ImageResizeModal open={open} onClose={handleClose} />
      <div className={classes.flex}>
        <div className={classes.imageSection}>
          <Typography variant="h2">YOUR IMAGE</Typography>

          <Image
            image={<img src={sampleImage} alt="sample" />}
            height={400}
            width={400}
          />
          <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary">
              Upload Image
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Resize Image
            </Button>
          </div>
        </div>

        <div className={classes.imageSection}>
          <Typography variant="h2">TRANSFORMED IMAGE</Typography>

          <Image
            image={<img src={sampleImage} alt="sample" />}
            height={400}
            width={400}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
