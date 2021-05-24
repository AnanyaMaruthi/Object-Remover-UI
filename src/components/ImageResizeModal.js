import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ImageInput from "./ImageInput";

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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 4, 3),
  },
}));

const ImageResizeModal = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <ImageInput />
      </div>
    </Modal>
  );
};

export default ImageResizeModal;
