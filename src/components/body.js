import React, { useState } from "react";
import Image from "./Image";
import { makeStyles } from "@material-ui/core/styles";
import ImageResizeModal from "./ImageResizeModal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import sampleImage from "../images/sample.jpg";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: theme.spacing(10),
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
  select: {
    minWidth: 150,
  },
}));

// todo:
// 1. Disable input image click when image has not been uploaded
// 2. Disable transform image button when image has not been uploaded
// 3. Add tool tip for disabled button
// 4. Dynamic image captions
// 5. Styling changes

const objectLabels = ["Cat", "Dog", "Human", "Ball", "Sun"];

const Body = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [inputImage, setInputImage] = useState(sampleImage);
  const [croppedImage, setCroppedImage] = useState(sampleImage);
  const [outputImage, setOutputImage] = useState(sampleImage);
  const [objectLabel, setObjectLabel] = useState(1);

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
    formData.append("object_label", objectLabel);

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

        <div>
          {" "}
          <FormControl className={classes.select}>
            <InputLabel id="class-label">Object</InputLabel>
            <Select
              labelId="class-label"
              value={objectLabel}
              onChange={(e) => setObjectLabel(e.target.value)}
            >
              {objectLabels.map((label, i) => (
                <MenuItem key={i} value={i + 1}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
