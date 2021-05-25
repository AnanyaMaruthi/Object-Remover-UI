import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Divider, Slider, Typography } from "@material-ui/core";
import Cropper from "react-easy-crop";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 550,
    backgroundColor: "#FAFAFA",
    border: 0,
  },
  header: {
    padding: theme.spacing(2, 3),
    background: theme.palette.primary.main,
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
  image: {
    position: "relative",
    width: 450,
    height: 450,
    margin: "auto",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    padding: theme.spacing(3, 0),
  },
  slider: {
    width: "200px",
  },
  actionSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
  footer: {
    padding: theme.spacing(2, 6, 3),
    textAlign: "right",
  },
}));

const ImageResizeModal = ({ open, onClose, imageSource }) => {
  const classes = useStyles();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  //   const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] =
  //     useState(undefined);
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    window.localStorage.setItem(
      "croppedAreaPixels",
      JSON.stringify(croppedAreaPixels)
    );
    console.info("Cropped area pixels", JSON.stringify(croppedAreaPixels));
  }, []);

  // useEffect(() => {
  //   const croppedAreaPixels = JSON.parse(
  //     window.localStorage.getItem("croppedAreaPixels")
  //   );
  //   setInitialCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h3" style={{ color: "#FAFAFA" }}>
            Resize Image
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.image}>
          <Cropper
            image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            //   initialCroppedAreaPixels={initialCroppedAreaPixels}
          />
        </div>
        <div className={classes.controls}>
          <Typography variant="subtitle1">Zoom</Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            className={classes.slider}
          />
        </div>
        <Divider />
        <div className={classes.footer}>
          <Button variant="contained" color="primary">
            Resize
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageResizeModal;
