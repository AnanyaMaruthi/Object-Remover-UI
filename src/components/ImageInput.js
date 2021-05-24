import React, { useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-easy-crop";
import { Button, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
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
    justifyContent: "space-around",
    padding: theme.spacing(3, 5, 3, 5),
  },
  slider: {
    width: "300px",
  },
  actionSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
  button: {
    borderRadius: "7%",
  },
}));

const ImageInput = () => {
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
    <div className={classes.root}>
      <Typography variant="h3">Resize Image</Typography>

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
      <div className={classes.actionSection}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="medium"
        >
          Resize
        </Button>
      </div>
    </div>
  );
};

export default ImageInput;
