import React from "react";
import Image from "./Image";
import { makeStyles } from "@material-ui/core/styles";
import ImageResizeModal from "./ImageResizeModal";
import { Button, Typography } from "@material-ui/core";
import sampleImage from "../images/sample.jpg";

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
  const [inputImaage, setInputImage] = React.useState(sampleImage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (e) => {
    setInputImage(URL.createObjectURL(e.target.files[0]));
    console.warn(inputImaage);
  };

  return (
    <>
      <ImageResizeModal
        open={open}
        onClose={handleClose}
        imageSource={inputImaage}
        onImageCrop={(url) => {
          setInputImage(url);
        }}
      />
      <div className={classes.flex}>
        <div className={classes.imageSection}>
          <Typography variant="h2">YOUR IMAGE</Typography>

          <Image
            image={<img src={inputImaage} alt="sample" />}
            height={400}
            width={400}
            caption={"Click to resize"}
            clickable
            onClick={handleOpen}
          />
          <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
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
