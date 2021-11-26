import React, { useState, withStyles } from "react";

import Grid from "@material-ui/core/Grid";
import ImagePreview from "../forms/ImagePreviewFormik";
import TextField from "@material-ui/core/TextField";
import { useFormikContext, Formik, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";

import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function AyudaForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const {
    values,
    setFieldValue,
    resetForm,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
  } = useFormikContext();

  const guardarNuevoItem = async () =>
    await axios
      .post(
        `${apiUrl}/ayuda`,
        {
          // imagen_icon: values.icono.fileUrl,
          imagen_icon: values.icono.filename,
          titulo: values.titulo,
          descripcion: values.descripcion,
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
      });

  const editarItem = async () =>
    await axios
      .put(
        `${apiUrl}/ayuda/${values._id}`,
        {
          imagen_icon: values.icono.filename,
          titulo: values.titulo,
          descripcion: values.descripcion,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return 2;
        } else return 3;
      })
      .catch((e) => {
        console.log(e);
        return 3;
        // setFieldValue("sendProgress", 3);
      });

  return (
    <Grid container spacing={3}>
      {openAlert && (
        <AlertDialogProgressResend
          titulo={
            values.isEditEnabled ? "Confirmar edición" : "Confirmar acción"
          }
          body={
            values.isEditEnabled
              ? "Esta seguro de que desea actualizar este elemento?"
              : "Esta seguro de que desea guardar este elemento"
          }
          agree="Aceptar"
          disagree="Cancelar"
          switch={openAlert}
          action={values.isEditEnabled ? editarItem : guardarNuevoItem}
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
            {"Nuevo elemento de Ayuda"}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Título"
          multiline
          rowsMax="4"
          name={values.titulo}
          value={values.titulo}
          onChange={(event) => {
            setFieldValue("titulo", event.target.value);
          }}
          helperText="En qué quieres ayudar al participante?, ingresa una pregunta o algo que sea relevante saber"
          error={Boolean(errors.titulo && touched.titulo)}
          onFocus={() => setFieldTouched("titulo")}
        />
        {errors.titulo && touched.titulo && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
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
          helperText="Ingrese algún texto, si en el titulo colocaste una pregunta frecuente, aquí puedes ingresar la respuesta"
          error={Boolean(errors.descripcion && touched.descripcion)}
          onFocus={() => setFieldTouched("descripcion")}
        />
        {errors.descripcion && touched.descripcion && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {errors.descripcion}
          </div>
        )}
      </Grid>
      <Grid item xs={12}>
        <ImagePreview
          icono={values.icono}
          setFieldValue={setFieldValue}
          values={values}
          subirIconoButtonTag="Seleccionar ícono"
          iconoFormikname="icono"
        />
        {Boolean(getIn(errors, "icono.status")) &&
          touched.titulo &&
          touched.descripcion && (
            <Typography
              variant="caption"
              gutterBottom
              style={{ color: "red", marginTop: ".5rem" }}
            >
              {getIn(errors, "icono.status")}
            </Typography>
          )}
      </Grid>
      {values.isEditEnabled || (
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
      )}
      {values.isEditEnabled && (
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
              Actualizar
            </Button>
          </Box>
          <Box p={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloseIcon />}
              onClick={() => {
                setFieldValue("isEditEnabled", false);
                resetForm();
              }}
            >
              cancelar
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
