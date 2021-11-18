import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import PersonFilled from "@material-ui/icons/PersonRounded";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";

import ImageInput from "../cropper/ImageInput";
import GalleryIcon from "./gallery.png";
import OpenMojiIcon from "./openmoji.jpg";
import CropperIconButton from "../cropper/AlertDialogSlider";
import Alert from "./GalleryAlert";
import AlertEmojies from "./GalleryAlertEmojies";
import GalleryImagesFromServer from "./GalleryImages";
import GalleryImageFromFolder from "./GalleryImageFromFolder";

import axios from "axios";
import { apiUrl, apiUrlImages } from "../shared/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  input: {
    display: "none",
  },
  closeFab: {
    width: "32px",
    height: "32px",
    minHeight: "initial",
    marginRight: "5px",
  },
  closeIcon: {
    display: "inline-flex",
    position: "relative",
    width: "18px",
    height: "18px",
  },
  photoSizeSelectLargeOutlinedIcon: {
    display: "inline-flex",
    position: "relative",
    width: "18px",
    height: "18px",
  },
  cardButton: {
    display: "inline",
    textAlign: "center",
  },
  cardButtonColor: {
    color: "#5B9595",
    backgroundColor: "#FFFFFE",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "#56DBC9",
    marginBottom: "20px",
  },
  cardButtonColorOpenEmoji: {
    color: "#5B9595",
    backgroundColor: "#FFFFFE",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "#ff9a76",
    marginBottom: "20px",
  },
  cardButtonColorSelected: {
    color: "#5B9595",
    backgroundColor: "#FFFFFE",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "#56DBC9",
    marginBottom: "20px",
  },
  cardButtonColorSelectedOpenEmoji: {
    color: "#5B9595",
    backgroundColor: "#FFFFFE",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "#fcf876",
    marginBottom: "20px",
  },
  circleButtons: {
    display: "flex",
  },
  green: {
    color: green[500],
    backgroundColor: green[500],
  },
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [galleryInputIsSelected, setgalleryInputIsSelected] = React.useState(
    false
  );
  const [galleryIconIsSelected, setgalleryIconIsSelected] = React.useState(
    false
  );
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [upload, setUpload] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [alertGallery, setAlertGallery] = React.useState(false);
  const [alertGalleryOpenEmoji, setAlertGalleryOpenEmoji] = React.useState(
    false
  );
  const [
    toogleGalleryLocalToCloud,
    setToogleGalleryLocalToCloud,
  ] = React.useState(false);
  const [toogleIconCloud, setToogleIconCloud] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const readFile = async (file) => {
    return new Promise((resolve) => {
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
    if (props.icono.fileUrlCropped != null && props.icono.fileCropped != null) {
      if (props.icono.file != null) {
        if (props.icono.file.name != null)
          formData.append(
            "photo",
            props.icono.fileCropped,
            props.icono.filename
          );
      } else {
        if (props.icono.filename != null)
          formData.append(
            "photo",
            props.icono.fileCropped,
            props.icono.filename
          );
        else
          formData.append(
            "photo",
            props.icono.fileCropped,
            "image_cropper.png"
          );
        console.log("prop", props.icono.fileUrlCropped);
        // TODO: Agregar validaciÃ³n mandar error si alguno es null
      }
    } else {
      formData.append("photo", props.icono.file);
    }
    axios
      .post(`${apiUrl}/upload`, formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        props.setFieldValue(`${props.iconoFormikname}.data`, res.data);
        props.setFieldValue(`${props.iconoFormikname}.status`, res.status);
        props.setFieldValue(
          `${props.iconoFormikname}.downloadUrl`,
          `${apiUrl}/download/${res.data}`
        );
        props.setFieldValue(`${props.iconoFormikname}.filename`, res.data);
        setSuccess(true);
        setLoading(false);
      });
  };

  const handleButtonInputImage = async (event) => {
    setAlertGallery(true);
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
    setAlertGallery(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Alert
          titulo="Escoja una imágen"
          body=""
          agree="Aceptar"
          disagree="Cancelar"
          switch={alertGallery}
          setFieldValue={props.setFieldValue}
          // action={}
          close={() => setAlertGallery(false)}
          toogleGalleryLocalToCloud={toogleGalleryLocalToCloud}
          selectFromGalleryComponent={
            <ImageInput
              handleButtonInputImage={handleButtonInputImage}
              setgalleryInputIsSelected={setgalleryIconIsSelected}
              toogleGalleryLocalToCloud={toogleGalleryLocalToCloud}
              setToogleGalleryLocalToCloud={setToogleGalleryLocalToCloud}
            >
              <Button
                className={
                  galleryInputIsSelected
                    ? classes.cardButtonColorSelected
                    : classes.cardButtonColor
                }
                onClick={() => setAlertGallery(true)}
                variant="contained"
                // color="primary"
                component="span"
              >
                <div className={classes.cardButton}>
                  {galleryInputIsSelected && !toogleGalleryLocalToCloud && (
                    <div class="content" style={{ backgroundColor: "#BBDEF9" }}>
                      <div class="right floated meta">Imagen Seleccionada</div>
                      <i class="big check circle icon"></i>
                    </div>
                  )}
                  <div>
                    <img src={GalleryIcon} alt="Galería imagen" height="100" />
                  </div>
                  <div>
                    Escoger imagen desde la galería{" "}
                    <Icon>add_photo_alternate</Icon>
                  </div>
                </div>
              </Button>
            </ImageInput>
          }
          selectFromOpenEmoji={
            <>
              {alertGalleryOpenEmoji && (
                <AlertEmojies
                  titulo="Escoja una imágen"
                  body=""
                  agree="Aceptar"
                  disagree="Cancelar"
                  switch={alertGalleryOpenEmoji}
                  setFieldValue={props.setFieldValue}
                  // action={}
                  close={() => setAlertGalleryOpenEmoji(false)}
                  selectFromServer={
                    <GalleryImageFromFolder
                      handleButtonInputImage={handleButtonInputImage}
                      columns={"seven"}
                      icono={props.icono}
                      iconoFormikname={props.iconoFormikname}
                      setAlertGallery={setAlertGallery}
                      setFieldValue={props.setFieldValue}
                      toogleGalleryLocalToCloud={toogleGalleryLocalToCloud}
                      setToogleGalleryLocalToCloud={
                        setToogleGalleryLocalToCloud
                      }
                    />
                  }
                />
              )}
              <Button
                className={
                  galleryInputIsSelected
                    ? classes.cardButtonColorSelectedOpenEmoji
                    : classes.cardButtonColorOpenEmoji
                }
                onClick={() => setAlertGalleryOpenEmoji(true)}
                variant="contained"
                // color="primary"
                component="span"
              >
                <div className={classes.cardButton}>
                  {galleryInputIsSelected && !toogleGalleryLocalToCloud && (
                    <div class="content" style={{ backgroundColor: "#ffecc7" }}>
                      <div class="right floated meta">Imagen Seleccionada</div>
                      <i class="big check circle icon"></i>
                    </div>
                  )}
                  <div>
                    <img src={OpenMojiIcon} alt="Galería imagen" height="100" />
                  </div>
                  <div>
                    Escoger imagen desde la galería de emojis{" "}
                    {/* <Icon>add_photo_alternate</Icon> */}
                  </div>
                </div>
              </Button>
            </>
          }
          selectFromServer={
            <GalleryImagesFromServer
              icono={props.icono}
              iconoFormikname={props.iconoFormikname}
              setAlertGallery={setAlertGallery}
              setFieldValue={props.setFieldValue}
              toogleGalleryLocalToCloud={toogleGalleryLocalToCloud}
              setToogleGalleryLocalToCloud={setToogleGalleryLocalToCloud}
            />
          }
        />
        <Box p={0}>
          <div>
            <Fab
              aria-label="save"
              color="primary"
              className={
                props.icono && props.icono.status === "fetched"
                  ? classes.green
                  : buttonClassname
              }
              onClick={() => setAlertGallery(true)}
            >
              {success || (props.icono && props.icono.status === "200") ? (
                <CheckIcon />
              ) : select || (props.icono && props.icono.status === "loaded") ? (
                <Avatar
                  alt={props.icono.filename}
                  src={`${props.icono.fileUrl}`}
                />
              ) : props.icono && props.icono.status === "fetched" ? (
                <Avatar
                  alt={props.icono.filename}
                  src={`${apiUrlImages}/${props.icono.filename}`}
                />
              ) : // <Thumb file={props.icono.file} status="" />
              props.icono && props.icono && props.icono.status != "" ? (
                <Avatar
                  alt={props.icono.filename}
                  src={`${apiUrlImages}/${props.icono}`}
                />
              ) : (
                <PersonFilled />
              )}
            </Fab>
          </div>
          {(select || (props.icono && props.icono.status === "loaded")) && (
            <Box>
              {/* Icon to unselect or cancel the uploaded image */}
              <Fab
                className={classes.closeFab}
                color="secondary"
                aria-label="delete"
                onClick={() => {
                  props.setFieldValue(`${props.iconoFormikname}.status`, "");
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
                aspectRatioFraction={props.aspectRatioFraction}
              />
            </Box>
          )}
          {props.icono && props.icono.status === "fetched" && (
            <Box className={classes.circleButtons}>
              {/* Icon to unselect or cancel the uploaded image */}
              <Fab
                className={classes.closeFab}
                color="secondary"
                aria-label="delete"
                onClick={() => {
                  props.setFieldValue(`${props.iconoFormikname}.status`, "");
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
                aspectRatioFraction={props.aspectRatioFraction}
              />
            </Box>
          )}
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </Box>
      </div>
      <div className={classes.wrapper}>
        {select || (props.icono && props.icono.status === "loaded") ? (
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {success || (props.icono && props.icono.status === "200")
              ? "Listo"
              : "Subir ícono"}
          </Button>
        ) : (
          <Button
            onClick={() => setAlertGallery(true)}
            variant="contained"
            color="primary"
            component="span"
          >
            {props.subirIconoButtonTag} <Icon>add_photo_alternate</Icon>
          </Button>
        )}
        {/* <ImageInput handleButtonInputImage={handleButtonInputImage}>
              <Button onClick={() =>setAlertGallery(true)} variant="contained" color="primary" component="span">
                {props.subirIconoButtonTag} <Icon>add_photo_alternate</Icon>
              </Button>
            </ImageInput> */}

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
