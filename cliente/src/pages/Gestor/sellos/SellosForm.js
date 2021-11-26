import React, { useState, withStyles } from "react";

import { useFormikContext, Formik, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ImagePreview from "../forms/ImagePreviewFormik";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import NotificacionListGridGallery from "./BonificacionForm/NotificacionListGridGallery";
import PremioListGridGallery from "./BonificacionForm/PremioListGridGallery";

import AlertDialogProgressResend from "../home/AlertDialogResend";
import ReactSelectMultiAnimated from "./ReactSelectMulti";
import DateRange from "../forms/filters/DateRange";

import axios from "axios";
import { apiUrl } from "../shared/constants";
import useBubbletownApi from "../helpers/useBubbletownApi";

const trigggerSello = [
  {
    value: "cantidad",
    label: "Cantidad a comprar $",
  },
  {
    value: "producto",
    label: "Producto a comprar",
  },
];

const numSellos = [
  // { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function SellosForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const { data: tarjetaSellos, loading } = useBubbletownApi({
    path: `tarjetasellos`,
  });

  function getFormatedJustIds(array) {
    return array.map((i) => i.value);
  }

  if (loading) return <CircularProgress />;
  return (
    <Formik
      initialValues={{
        // ***************Simple test INIT STATE
        // titulo: "Tarjeta de lealtad del mes de Abril",
        // descripcion: "Por cada bebida que compras acumulas una estrella, al acumular 8 bebidas te regalamos una!",
        // num_sellos: 6,
        // fecha_inicio: "2020-04-03T06:00:00.000Z",
        // fecha_fin: "2020-05-03T06:00:00.000Z",
        // trigger: 'cantidad',
        // cantidad_trigger: 0,
        // producto: [],
        // iconoOn: {
        //   file: null,
        //   fileUrl: `${apiUrl}/download/stamp_off.png`,
        //   filename: "fb_entristece_2.gif",
        //   fileUrlCropped: `${apiUrl}/download/stamp_off.png`,
        //   fileCropped: null,
        //   downloadUrl: `${apiUrl}/download/stamp_off.png`,
        //   status: "fetched",
        //   isCroppedCompleted: false
        // },
        // iconoOff: {
        //   file: null,
        //   fileUrl: `${apiUrl}/download/stamp_off.png`,
        //   filename: "monocara.png",
        //   fileUrlCropped: null,
        //   fileCropped: null,
        //   downloadUrl: `${apiUrl}/download/stamp_on.png`,
        //   status: "fetched",
        //   isCroppedCompleted: false
        // },
        // id_promocion: "5e701fba1377db6386eb11da",
        // id_notificacion:  "5ecd8c764231f3581ff1aa94"
        // ******************INIT STATE
        _id: tarjetaSellos._id || "",
        titulo: tarjetaSellos.titulo || "",
        descripcion: tarjetaSellos.descripcion || "",
        num_sellos: tarjetaSellos.num_sellos || null,
        fecha_inicio: tarjetaSellos.fecha_inicio || "",
        fecha_fin: tarjetaSellos.fecha_fin || "",
        trigger: tarjetaSellos.trigger || "",
        cantidad_trigger: tarjetaSellos.cantidad_trigger || null,
        producto: tarjetaSellos.producto || [],
        iconoOn: {
          file: null,
          fileUrl: null,
          filename: tarjetaSellos.icono_on || "image_cropped",
          fileUrlCropped: null,
          fileCropped: null,
          downloadUrl: null,
          status: tarjetaSellos.icono_on ? "fetched" : "",
          isCroppedCompleted: false,
        },
        iconoOff: {
          file: null,
          fileUrl: null,
          filename: tarjetaSellos.icono_off || "image_cropped",
          fileUrlCropped: null,
          fileCropped: null,
          downloadUrl: null,
          status: tarjetaSellos.icono_off ? "fetched" : "",
          isCroppedCompleted: false,
        },
        id_promocion: "",
        id_notificacion: "",
        //***************** */ Testing validation
        // _id: "",
        // titulo: "",
        // descripcion: "",
        // num_sellos: null,
        // fecha_inicio: "",
        // fecha_fin: "",
        // trigger: "",
        // cantidad_trigger: null,
        // producto: [],
        // iconoOn: {
        //   file: null,
        //   fileUrl: null,
        //   filename: "image_cropped",
        //   fileUrlCropped: null,
        //   fileCropped: null,
        //   downloadUrl: null,
        //   status: "",
        //   isCroppedCompleted: false,
        // },
        // iconoOff: {
        //   file: null,
        //   fileUrl: null,
        //   filename: "image_cropped",
        //   fileUrlCropped: null,
        //   fileCropped: null,
        //   downloadUrl: null,
        //   status: "",
        //   isCroppedCompleted: false,
        // },
        // id_promocion: "",
        // id_notificacion: "",
      }}
      validationSchema={Yup.object({
        _id: Yup.string().required("Requerido"),
        titulo: Yup.string().required("Requerido"),
        descripcion: Yup.string().required("Requerido"),
        num_sellos: Yup.number()
          .typeError("El campo puntos debe ser de tipo numérico")
          .min(0, "Solo se admiten valores positivos y cero")
          .required("Requerido"),
        fecha_inicio: Yup.string().required("Fecha de inicio requerida"),
        fecha_fin: Yup.string().required("Fecha de fin requerida"),
        trigger: Yup.string().required("Requerido"),
        cantidad_trigger: Yup.number()
          .typeError("El campo puntos debe ser de tipo numérico")
          .positive("Solo se admiten valores positivos")
          .required("Requerido"),
        producto: Yup.array()
          .ensure()
          .min(1, "Seleccione al menos un producto"),
        // .of(Yup.string().required("Requerido")),
        iconoOn: Yup.object().shape({
          status: Yup.mixed()
            .notOneOf(
              ["loaded"],
              "Requerido, Aún no ha subido su imagen, de click en SUBIR ICONO"
            )
            .required("Campo requerido"),
        }),
        iconoOff: Yup.object().shape({
          status: Yup.mixed()
            .notOneOf(
              ["loaded"],
              "Requerido, Aún no ha subido su imagen, de click en SUBIR ICONO"
            )
            .required("Campo requerido"),
        }),
        id_promocion: Yup.string().required("Requerido"),
        id_notificacion: Yup.string().required("Requerido"),
      })}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        /* and other goodies */
      }) => (
        <Grid container spacing={3}>
          {openAlert && (
            <AlertDialogProgressResend
              titulo="Confirmar acción"
              body="Esta seguro de que desea guardar este elemento"
              agree="Aceptar"
              disagree="Cancelar"
              switch={openAlert}
              action={async () =>
                await axios
                  .put(
                    `${apiUrl}/tarjetasellos`,
                    {
                      fecha_inicio: values.fecha_inicio,
                      fecha_fin: values.fecha_fin,
                      num_sellos: values.num_sellos,
                      titulo: values.titulo,
                      descripcion: values.descripcion,
                      icono_off: values.iconoOff.filename,
                      icono_on: values.iconoOn.filename,
                      producto: getFormatedJustIds(values.producto),
                      trigger: values.trigger,
                      cantidad_trigger: values.cantidad_trigger,
                      id_notificacion: values.id_notificacion,
                      id_promocion: values.id_promocion,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) return 2;
                    else return 3;
                  })
                  .catch((e) => {
                    console.log(e);
                    return 3;
                    // setFieldValue("sendProgress", 3);
                  })
              }
              close={() => {
                setOpenAlert(false);
                console.log("click cerrar");
                return 2;
              }}
            />
          )}
          <Grid item xs={12}>
            <div className={classes.title}>
              <Typography variant="h6" color="inherit">
                {"Configuracion de la tarjeta de sellos"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Título"
              multiline
              rowsMax="6"
              name={values.titulo}
              value={values.titulo}
              onChange={(event) => {
                setFieldValue("titulo", event.target.value);
              }}
              helperText="Ingresa un título para esta tarjeta de sellos, no aparecerá en la aplicación pero servirá de identificador"
              onChange={(event) => {
                setFieldValue("titulo", event.target.value);
              }}
              error={Boolean(errors.titulo && touched.titulo)}
              onFocus={() => setFieldTouched("titulo")}
            />
            {errors.titulo && touched.titulo && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.titulo}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Descripción"
              multiline
              rowsMax="6"
              name={values.descripcion}
              value={values.descripcion}
              onChange={(event) => {
                setFieldValue("descripcion", event.target.value);
              }}
              helperText="Escribe algún texto que describa la dinámica de esta tarjeta de sellos. Incita a tus clientes a conseguir sellos."
              error={Boolean(errors.descripcion && touched.descripcion)}
              onFocus={() => setFieldTouched("descripcion")}
            />
            {errors.descripcion && touched.descripcion && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.descripcion}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-Nsellos"
              select
              label="Número de sellos"
              value={values.num_sellos > 0 ? values.num_sellos : ""}
              onChange={(event) => {
                let value = parseInt(event.target.value, 10);
                if (isNaN(value)) value = event.target.value;
                setFieldValue("num_sellos", value);
              }}
              helperText="Por favor seleccione algún número. Cúantos sellos tendrá la tarjeta de sellos, es decir, cuántos sellos deberán acumular los participantes?"
              variant="outlined"
              error={Boolean(errors.num_sellos && touched.num_sellos)}
              onFocus={() => setFieldTouched("num_sellos")}
            >
              {numSellos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.num_sellos && touched.num_sellos && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.num_sellos}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ height: "16px", marginBottom: "5px", color: "#757575" }}
              color="inherit"
            >
              Vigencia
            </Typography>
            <DateRange
              setFieldValue={setFieldValue}
              valueStart={values.fecha_inicio || ""}
              valueEnd={values.fecha_fin || ""}
              field1={"fecha_inicio"}
              field2={"fecha_fin"}
              onFocus={() => {
                setFieldTouched("fecha_inicio");
                setFieldTouched("fecha_fin");
              }}
            />
            {/* {errors.fecha_inicio && touched.fecha_inicio && ( */}
            {/* {touched.titulo &&
              touched.descripcion &&
              touched.num_sellos &&
              Boolean(errors.fecha_inicio) && (
                <div style={{ color: "red", marginTop: "3px" }}>
                  {`${errors.fecha_fin}  ${errors.inicio}`}
                </div>
              )} */}
            {/* {errors.fecha_fin && touched.fecha_fin && 
            {touched.titulo && touched.descripcion && touched.num_sellos && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.fecha_fin }
              </div>
            )} */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-triggerSello"
              select
              label="Forma de obtener un sello"
              //   disabled={props.editar}
              value={values.trigger}
              onChange={(event) => {
                setFieldValue("trigger", event.target.value);
              }}
              helperText="Por favor seleccione algún de disparador. ¿Dé que forma se obtendrán los sellos?"
              variant="outlined"
              error={Boolean(errors.trigger && touched.trigger)}
              onFocus={() => setFieldTouched("trigger")}
            >
              {trigggerSello.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.trigger && touched.trigger && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.trigger}
              </div>
            )}
          </Grid>
          {values.trigger === "cantidad" && (
            <Grid item xs={6}>
              <TextField
                label="Ingrese la cantidad"
                type="number"
                rowsMax="6"
                name={values.cantidad_trigger}
                value={values.cantidad_trigger}
                onChange={(event) => {
                  let value = parseInt(event.target.value, 10);
                  if (isNaN(value)) value = event.target.value;
                  setFieldValue("cantidad_trigger", value);
                }}
                helperText="Valor en pesos ($) que debe sobrepasar el ticket de venta"
                error={
                  Boolean(errors.cantidad_trigger) &&
                  Boolean(touched.cantidad_trigger)
                }
                onFocus={() => setFieldTouched("cantidad_trigger")}
              />
              {errors.cantidad_trigger && touched.cantidad_trigger && (
                <div style={{ color: "red", marginTop: "3px" }}>
                  {errors.cantidad_trigger}
                </div>
              )}
            </Grid>
          )}
          {values.trigger === "producto" && (
            <Grid item xs={6}>
              <ReactSelectMultiAnimated
                values={values.producto}
                handleChange={(value) => {
                  // this is going to call setFieldValue and manually update values.topcis
                  setFieldValue("producto", value);
                }}
                value={values.productos}
                error={Boolean(errors.producto && touched.producto)}
                onFocus={() => setFieldTouched("producto")}
              />
              {errors.producto && touched.producto && (
                <div style={{ color: "red", marginTop: "3px" }}>
                  {errors.producto}
                </div>
              )}
            </Grid>
          )}
          <Grid item xs={6}>
            <ImagePreview
              icono={values.iconoOn}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar sello ON"
              iconoFormikname="iconoOn"
            />
            {Boolean(getIn(errors, "iconoOn.status")) &&
              touched.titulo &&
              touched.descripcion &&
              touched.num_sellos &&
              touched.trigger && (
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ color: "red", marginTop: ".5rem" }}
                >
                  {getIn(errors, "iconoOn.status")}
                </Typography>
              )}
          </Grid>
          <Grid item xs={6}>
            <ImagePreview
              icono={values.iconoOff}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar sello OFF"
              iconoFormikname="iconoOff"
            />
            {Boolean(getIn(errors, "iconoOn.status")) &&
              touched.titulo &&
              touched.descripcion &&
              touched.num_sellos &&
              touched.trigger && (
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ color: "red", marginTop: ".5rem" }}
                >
                  {getIn(errors, "iconoOn.status")}
                </Typography>
              )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="inherit">
              Bonificacion de la tarjeta de sellos
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Seleccionar notificación"
              name="notificaciones"
              // disabled={props.editar}
              value={values.id_notificacion}
              // onChange={event => {
              //   // setFieldValue("notificaciones.value", event.target.value);
              //   setFormState(prevState => ({ ...prevState, 'id_notificacion': "5e7bdf4da36b5ac9b43604a"}));
              //   console.log (values.id_notificacion);
              // }}
              helperText="Por favor, seleccione algún tipo de notificación. ¿Qué notificación de cumpleaños recibirán los participantes?. Recuerda que debes crearla previamente en la pestaña Formularios, enviándosela a 0 participantes"
              variant="outlined"
              error={Boolean(errors.id_notificacion && touched.id_notificacion)}
              onFocus={() => setFieldTouched("id_notificacion")}
            >
              <NotificacionListGridGallery
                value={values.id_notificacion}
                label={"seleccion"}
                handleChange={(n) => {
                  // setFormState((prevState) => ({
                  //   ...prevState,
                  //   id_notificacion: n,
                  // }));
                  console.log(n);
                  setFieldValue("id_notificacion", n);
                }}
              >
                {values.id_notificacion}
              </NotificacionListGridGallery>
            </TextField>
            {errors.id_notificacion && touched.id_notificacion && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.id_notificacion}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <PremioListGridGallery
              value={values.id_promocion}
              handleChange={(n) => {
                // setFormState((prevState) => ({ ...prevState, promocion: n }));
                // console.log(n);
                setFieldValue("id_promocion", n);
              }}
              error={Boolean(errors.id_promocion && touched.id_promocion)}
              onFocus={() => setFieldTouched("id_promocion")}
            />
            {errors.id_promocion && touched.id_promocion && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.id_promocion}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={() => {
                  setOpenAlert(true);
                }}
              >
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
