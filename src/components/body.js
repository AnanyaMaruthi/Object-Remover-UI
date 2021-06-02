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
  Snackbar,
  Typography,
} from "@material-ui/core";
import placeholderImage from "../images/sample.jpg";
import { Alert } from "@material-ui/lab";

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
// 1. Add tool tip for disabled button
// 2. Styling changes

const objectLabels = [
  "BG",
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "airplane",
  "bus",
  "train",
  "truck",
  "boat",
  "traffic light",
  "fire hydrant",
  "stop sign",
  "parking meter",
  "bench",
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "backpack",
  "umbrella",
  "handbag",
  "tie",
  "suitcase",
  "frisbee",
  "skis",
  "snowboard",
  "sports ball",
  "kite",
  "baseball bat",
  "baseball glove",
  "skateboard",
  "surfboard",
  "tennis racket",
  "bottle",
  "wine glass",
  "cup",
  "fork",
  "knife",
  "spoon",
  "bowl",
  "banana",
  "apple",
  "sandwich",
  "orange",
  "broccoli",
  "carrot",
  "hot dog",
  "pizza",
  "donut",
  "cake",
  "chair",
  "couch",
  "potted plant",
  "bed",
  "dining table",
  "toilet",
  "tv",
  "laptop",
  "mouse",
  "remote",
  "keyboard",
  "cell phone",
  "microwave",
  "oven",
  "toaster",
  "sink",
  "refrigerator",
  "book",
  "clock",
  "vase",
  "scissors",
  "teddy bear",
  "hair drier",
  "toothbrush",
];

const Body = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [inputImage, setInputImage] = useState(placeholderImage);
  const [croppedImage, setCroppedImage] = useState(placeholderImage);
  const [outputImage, setOutputImage] = useState(placeholderImage);
  const [objectLabel, setObjectLabel] = useState("person");
  const [outputLoading, setOutputLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileUpload = (e) => {
    try {
      let imageUrl = URL.createObjectURL(e.target.files[0]);
      setInputImage(imageUrl);
      setCroppedImage(imageUrl);
      setOutputImage(placeholderImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    let image = await fetch(croppedImage).then((r) => r.blob());
    const formData = new FormData();
    formData.append("image", image);
    formData.append("object_label", objectLabel);

    setOutputLoading(true);
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
        setOutputLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setOutputLoading(false);
        setError(true);
        setTimeout(() => setError(false), 3000);
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
          setOutputImage(placeholderImage);
        }}
      />
      <div className={classes.flex}>
        <div className={classes.imageSection}>
          <Typography variant="h2">YOUR IMAGE</Typography>

          <Image
            image={<img src={croppedImage} alt="sample" />}
            height={512}
            width={512}
            caption={
              croppedImage === placeholderImage
                ? "Upload an image"
                : "Click to resize"
            }
            clickable={croppedImage !== placeholderImage}
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
          <FormControl className={classes.select}>
            <InputLabel id="class-label">Object</InputLabel>
            <Select
              labelId="class-label"
              value={objectLabel}
              onChange={(e) => setObjectLabel(e.target.value)}
            >
              {objectLabels.map((label, i) => (
                <MenuItem key={i} value={label}>
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
            height={512}
            width={512}
            loading={outputLoading}
            caption={
              outputImage === placeholderImage
                ? "Transformed image will be shown here"
                : outputLoading
                ? "Please wait while your image is being transformed"
                : "Transformed image"
            }
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={croppedImage === placeholderImage}
          >
            Transform Image
          </Button>
        </div>
      </div>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
        }}
      >
        <Alert
          onClose={() => {
            setError(false);
          }}
          severity="error"
        >
          Oops! Something went wrong!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Body;
