import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import PersonFilled from "@material-ui/icons/PersonRounded";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectLargeOutlinedIcon from "@material-ui/icons/PhotoSizeSelectLargeOutlined";
import Icon from "@material-ui/core/Icon";

import Thumb from "./Thumb";
import ImageInput from "./ImageInput";
import CropperIconButton from "./AlertDialogSlider";

import { useFormikContext } from "formik";
import axios from "axios";
import {apiUrl} from "../shared/constants"; 

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  input: {
    display: "none"
  },
  closeFab: {
    width: "32px",
    height: "32px",
    minHeight: "initial",
    marginRight: "5px"
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
  }
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [upload, setUpload] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const readFile = async file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const handleButtonClick = async () => {
    setSuccess(false);
    setLoading(true);

    var formData = new FormData();
    // console.log("name:",props.icono.file.name);
    if (
      props.icono.fileUrlCropped != null &&
      props.icono.fileCropped != null &&
      props.icono.file.name != null
    ) {
      console.log("prop", props.icono.fileUrlCropped);
      // TODO: Agregar validación mandar error si alguno es null
      formData.append("photo", props.icono.fileCropped, props.icono.file.name);
    } else formData.append("photo", props.icono.file);
    axios
      .post(`${apiUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);

        props.setFieldValue(`${props.iconoFormikname}.downloadUrl`, res.data);
        // props.setFieldValue(`${props.iconoFormikname}.data`, res.data);
        props.setFieldValue(`${props.iconoFormikname}.status`, res.status);
        setSuccess(true);
        setLoading(false);
      });
  };

  const handleButtonInputImage = async event => {
    setSelect(true);
    props.setFieldValue(
      `${props.iconoFormikname}.file`,
      event.currentTarget.files[0]
    );
    props.setFieldValue(`${props.iconoFormikname}.status`, "loaded");
    // console.log(event.currentTarget.files[0]);
    // console.log(props.file);
    // let imageDataUrl = await readFile(event.currentTarget.files[0]);
    let imageDataUrl = URL.createObjectURL(event.currentTarget.files[0]);
    // props.setFieldValue("icono.filename", event.currentTarget.files[0].name);
    // TODO: ELiminar el URL si es el caso de sobreescribir
    props.setFieldValue(`${props.iconoFormikname}.fileUrl`, imageDataUrl);
    console.log(`${props.iconoFormikname}.fileUrl`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Box p={0}>
          <div>
            <Fab
              aria-label="save"
              color="primary"
              className={buttonClassname}
              disableTouchRipple="true"
            >
              {success ? (
                <CheckIcon />
              ) : select ? (
                props.icono.status === 200 ? (
                  <Thumb file={props.icono.file} status="" />
                ) : (
                  <Thumb file={props.icono.file} status="" />
                )
              ) : (
                <PersonFilled />
              )}
            </Fab>
          </div>
          {select && (
            <Box>
              {/* Icon to unselect or cancel the uploaded image */}
              <Fab
                className={classes.closeFab}
                color="secondary"
                aria-label="delete"
                onClick={() => {
                  setSelect(false);
                  setSuccess(false);
                  setLoading(false);
                }}
                //eliminar del servidor si fue subida
                //eliminar del estado de formik
              >
                <CloseIcon className={classes.closeIcon} />
              </Fab>
              {/* Icon to open Modal to Crop Image */}
              <CropperIconButton
                icono={props.icono}
                iconoFormikname={props.iconoFormikname}
                values={props.values}
                setFieldValue={props.setFieldValue}
                title="Herramienta de recorte"
                contentText="Deslice la barra inferior para recortar la imagen hasta obtener el
               tamaño de imagen deseada dentro de cuadro sin sombrear. Puede
               utilizar el la rueda de desplazamiento del mouse para cambiar la
               región de corte y con el cursor arrastrar la imagen para cambiar
               la ubicación de la imagen dentro de la sección a recortar"
                agree="Recortar"
                disagree="Cancelar"
              />
            </Box>
          )}
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </Box>
      </div>
      <div className={classes.wrapper}>
        {select ? (
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {success ? "Listo" : "Subir ícono"}
          </Button>
        ) : (
          <ImageInput handleButtonInputImage={handleButtonInputImage}>
            <Button variant="contained" color="primary" component="span">
              {props.subirIconoButtonTag} <Icon>add_photo_alternate</Icon>
            </Button>
          </ImageInput>
        )}

        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
      {/* {props.values.icono.fileUrlCropped && (
        <img src={props.values.icono.fileUrlCropped} alt="Cropped" />
      )} */}
    </div>
  );
}
