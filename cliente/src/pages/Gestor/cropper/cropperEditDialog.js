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

// import CropControls from "./CropEdit";

import { useState, useCallback } from "react";
import Slider from "@material-ui/lab/Slider";
import Cropper from "react-easy-crop";
import "./styles.css";
import getCroppedImg from "./cropImage";

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
  closeIcon: {
    display: "inline-flex",
    position: "relative",
    width: "18px",
    height: "18px"
  },
  photoSizeSelectLargeOutlinedIcon: {
    display: "inline-flex",
    position: "relative",
    width: "18px",
    height: "18px"
  },
  rel: {
    display: "block",
    postition: "relative"
  }
}));

export default function AlertDialogToCropImage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [recortar, setRecortar] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //set imageUrl = null !
  };

  const handleCrop = () => {
    // setRecortar(props.values.icono.pixels);
    // onCropComplete();
    showResult(props.values.icono.fileUrl, props.values.icono.pixels);
    console.log("recortar: true");
    setOpen(false);
  };

  ///////////////////+
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    //HAY QUE REFACTOORIZAR TODAS LAS EDIT TOOLS EN UN SOLO COMPONENTE,
    // AÃADIR COMPs: RECORTAR Y CANCELAR
    props.setFieldValue("icono.pixels", croppedAreaPixels);
  }, []);

  const showResult = async croppedAreaPixels => {
    try {
      // this.setState({
      //   isCropping: true,
      // })
      // console.log(croppedAreaPixels);
      const croppedImage = await getCroppedImg(
        props.values.icono.fileUrl,
        props.values.icono.pixels
      );
      props.setFieldValue("icono.fileUrlCropped", croppedImage);
      // console.log("done", { croppedImage });
      // this.setState({
      //   croppedImage,
      //   isCropping: false,
      // })
    } catch (e) {
      console.error(e);
      // this.setState({
      //   isCropping: false,
      // })
    }
  };
  ////////////////////

  return (
    <>
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
          <DialogTitle id="alert-dialog-slide-title">
            {"Herramienta de recorte"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Deslice la barra inferior para recortar la imagen hasta obtener el
              tamaÃ±o de imagen deseada dentro de cuadro sin sombrear. Puede
              utilizar el la rueda de desplazamiento del mouse para cambiar la
              regiÃ³n de corte y con el cursor arrastrar la imagen para cambiar
              la ubicaciÃ³n de la imagen dentro de la secciÃ³n a recortar
            </DialogContentText>
            <div className="rel">
              <div className="App">
                <div className="crop-container">
                  <Cropper
                    image={props.values.icono.fileUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 }
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                {/* {props.recortar && console.log("PRESIONO RECORTAR")} */}
                <div className="controls">
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    classes={{ container: "slider" }}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleCrop} color="primary">
              Recortar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
