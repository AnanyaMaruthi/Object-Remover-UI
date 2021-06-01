import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Divider, Slider, Typography } from "@material-ui/core";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 600,
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
    width: 512,
    height: 512,
    margin: "auto",
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
  footer: {
    padding: theme.spacing(2, 6, 3),
    textAlign: "right",
  },
}));

const ImageResizeModal = ({ open, onClose, imageSource, onImageCrop }) => {
  const classes = useStyles();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSource, croppedAreaPixels);
      onImageCrop(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSource, onImageCrop, onClose]);

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
            image={imageSource}
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
          <Button variant="contained" color="primary" onClick={handleImageCrop}>
            Resize
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageResizeModal;
