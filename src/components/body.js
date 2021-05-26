import React, { useState } from "react";
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

  const [open, setOpen] = useState(false);
  const [inputImage, setInputImage] = useState(sampleImage);
  const [croppedImage, setCroppedImage] = useState(sampleImage);
  const [outputImage, setOutputImage] = useState(sampleImage);

  const handleFileUpload = (e) => {
    try {
      let imageUrl = URL.createObjectURL(e.target.files[0]);
      setInputImage(imageUrl);
      setCroppedImage(imageUrl);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    let image = await fetch(croppedImage).then((r) => r.blob());
    const formData = new FormData();
    formData.append("image", image);
    formData.append("object_label", 1);

    fetch("http://localhost:4000/inpaint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        let x = data["image_string"].substring(
          2,
          data["image_string"].length - 1
        );
        setOutputImage("data:image/jpeg;base64," + x);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ImageResizeModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        imageSource={inputImage}
        onImageCrop={(url) => {
          setCroppedImage(url);
        }}
      />
      <div className={classes.flex}>
        <div className={classes.imageSection}>
          <Typography variant="h2">YOUR IMAGE</Typography>

          <Image
            image={<img src={croppedImage} alt="sample" />}
            height={400}
            width={400}
            caption={"Click to resize"}
            clickable
            onClick={() => setOpen(true)}
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
            image={<img src={outputImage} alt="sample" />}
            height={400}
            width={400}
            caption="Transformed image"
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Transform Image
          </Button>
        </div>
      </div>
    </>
  );
};

export default Body;
