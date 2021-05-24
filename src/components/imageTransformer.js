import React from "react";
import ImageCard from "./imageCard";
import { makeStyles } from "@material-ui/core/styles";
import ImageInput from "./ImageInput";
import ImageResizeModal from "./ImageResizeModal";
import { Button } from "@material-ui/core";

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.flex}>
        <ImageResizeModal open={open} onClose={handleClose} />
        {/* <ImageCard />
      <ImageCard /> */}
        <ImageInput />
        <ImageCard />
      </div>
      <Button color="primary" onClick={handleOpen}>
        Upload Image
      </Button>
    </>
  );
};

export default ImageTransformer;
