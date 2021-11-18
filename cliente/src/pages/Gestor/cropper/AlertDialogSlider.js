import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import PhotoSizeSelectLargeOutlinedIcon from "@material-ui/icons/PhotoSizeSelectLargeOutlined";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

import getCroppedImg from "./cropImage";
import CropControls from "./CropEdit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  input: {
    display: "none"
  },
  closeFab: {
    width: "32px",
    height: "32px",
    minHeight: "initial"
  },
  photoSizeSelectLargeOutlinedIcon: {
    display: "inline-flex",
    position: "relative",
    width: "18px",
    height: "18px"
  }
  // rel: {
  //   display: "block",
  //   postition: "relative"
  // }
}));

export default function AlertDialogSlide(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cropZone, setCropZone] = React.useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  function handleCropChange(newCrop) {
    setCropZone(newCrop);
    // console.log("onCropChange from child", cropZone, newCrop);
  }

  async function handleFinishCrop() {
    // async function finishCrop(croppedAreaPixels) {
    try {
      const croppedImage = await getCroppedImg(
        props.icono.fileUrl,
        cropZone,
        props.setFieldValue,
        props.iconoFormikname
      );
      props.setFieldValue(
        `${props.iconoFormikname}.fileUrlCropped`,
        croppedImage
      );
      props.setFieldValue(
        `${props.iconoFormikname}.status`,
        "loaded"
      );
      setOpen(false);
      console.log("done", `${props.iconoFormikname}.fileUrlCropped`, {
        croppedImage
      });
    } catch (e) {
      console.error(e);
    }
    console.log(cropZone);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
  };

  return (
    <>
      {/* {`${props.iconoFormikname}.fileUrlCropped`} */}
      <Fab
        className={classes.closeFab}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        //eliminar del servidor si fue subida
        //eliminar del estado de formik
      >
        <PhotoSizeSelectLargeOutlinedIcon
          className={classes.photoSizeSelectLargeOutlinedIcon}
        />
      </Fab>
      {open && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
          <DialogContent component={"span"}>
            <DialogContentText id="alert-dialog-slide-description">
              {props.contentText}
            </DialogContentText>
            <CropControls
              onCropAreaChange={handleCropChange}
              onFinishCrop={handleFinishCrop}
              values={props.values}
              icono={props.icono}
              iconoFormikName={props.iconoFormikname}
              aspectRatioFraction={props.aspectRatioFraction}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {props.disagree}
            </Button>
            <Button onClick={handleFinishCrop} color="primary">
              {props.agree}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
