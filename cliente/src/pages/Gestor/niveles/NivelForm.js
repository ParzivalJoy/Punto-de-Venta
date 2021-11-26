import React, { useState, withStyles } from "react";

import { useFormikContext, Formik, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AlertDialogProgressResend from "../home/AlertDialogResend";
import NotificacionListGridGallery from "../birthdays/NotificacionListGridGallery";
import PremioListGridGallery from "../birthdays/PremioListGridGallery";
import MaterialCalendarDatePicker from "../forms/calendarField";

import axios from "axios";
import { apiUrl } from "../shared/constants";

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
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
];

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function NivelForm() {
  const {
    values,
    setFieldValue,
    resetForm,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext();
  const classes = useStyles();
  const [openGuardarAlert, setOpenGuardarAlert] = React.useState(false);
  const [openEditAlert, setOpenEditAlert] = React.useState(false);
  const [addLevelForm, setAddLevelForm] = React.useState(false);

  function getFormatedJustIds(array) {
    return array.map((i) => i.value);
  }

  const postNivel = async () =>
    await axios
      .post(
        `${apiUrl}/niveles`,
        {
          num_puntos: values.num_puntos,
          // dias_vigencia: values.dias_vigencia,
          fecha_vencimiento: values.fecha_vencimiento,
          // max_canjeos: values.max_canjeos,
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
      });

  const patchNivel = async () =>
    await axios
      .put(
        `${apiUrl}/niveles/${values._id}`,
        {
          num_puntos: values.num_puntos,
          // dias_vigencia: values.dias_vigencia,
          fecha_vencimiento: values.fecha_vencimiento,
          // max_canjeos: values.max_canjeos,
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
      });

  return (
    <Grid container spacing={3}>
      {openGuardarAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar acción"
          body="Esta seguro de que desea guardar este elemento"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openGuardarAlert}
          action={postNivel}
          close={() => {
            setOpenGuardarAlert(false);
            console.log("click cerrar");
            return 2;
          }}
        />
      )}
      {openEditAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar acción"
          body="Esta seguro de que desea guardar este nivel con los cambios realizados"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openEditAlert}
          action={patchNivel}
          close={() => {
            setOpenEditAlert(false);
            console.log("click cerrar");
            return 2;
          }}
        />
      )}
      <Grid item xs={12}>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit">
            {values.editar ? "Editar nivel" : "Añadir nuevo nivel"}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-select-Npuntos"
          label="Número de puntos"
          value={values.num_puntos}
          onChange={(event) => {
            let value = parseInt(event.target.value, 10);
            if (isNaN(value)) value = event.target.value;
            setFieldValue("num_puntos", value);
          }}
          helperText="Por favor seleccione algún número"
          error={Boolean(errors.num_puntos && touched.num_puntos)}
          onFocus={() => setFieldTouched("num_puntos")}
        />
        {errors.num_puntos && touched.num_puntos && (
          <div style={{ color: "red", marginTop: "3px" }}>
            {errors.num_puntos}
          </div>
        )}
      </Grid>
      <Grid item xs={6}>
        <MaterialCalendarDatePicker
          label={"Fecha de vencimiento"}
          setFieldValue={setFieldValue}
          field={"fecha_vencimiento"}
          value={values.fecha_vencimiento}
          error={Boolean(errors.fecha_vencimiento && touched.fecha_vencimiento)}
          onFocus={() => setFieldTouched("fecha_vencimiento")}
        />
        {errors.fecha_vencimiento && touched.fecha_vencimiento && (
          <div style={{ color: "red", marginTop: "3px" }}>
            {errors.fecha_vencimiento}
          </div>
        )}
      </Grid>
      {/* REMOVED FOR fecha_vencimiento
       <Grid item xs={6}>
        <TextField
          id="outlined-select-Npuntos"
          label="Dias de vigencia"
          value={values.dias_vigencia}
          onChange={(event) => {
            let value = parseInt(event.target.value, 10);
            if (isNaN(value)) value = event.target.value;
            setFieldValue("dias_vigencia", value);
          }}
          helperText="Número de días que tendrá el participante para canjear el premio después de obtenerlo"
        ></TextField>
      </Grid> */}
      {/* <Grid item xs={6}>
        <TextField
          id="outlined-select-Ncanjeos"
          label="Máximo número de canjeos"
          value={values.max_canjeos >= 0 ? values.max_canjeos : ""}
          onChange={(event) => {
            let value = parseInt(event.target.value, 10);
            if (isNaN(value)) value = event.target.value;
            setFieldValue("max_canjeos", value);
          }}
          helperText="Número de veces que se podrá canjear la bonificacion de este nivel"
        ></TextField>
      </Grid> */}
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
          helperText="Por favor seleccione algún tipo de notificación"
          variant="outlined"
          error={Boolean(errors.id_notificacion && touched.id_notificacion)}
          onFocus={() => setFieldTouched("id_notificacion")}
        >
          <NotificacionListGridGallery
            value={values.id_notificacion}
            label={"seleccion"}
            handleChange={(n) => {
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
            console.log(n);
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
      <Grid item xs={12} >
        <Box p={2} spacing={3}>
          {!values.editar && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                setOpenGuardarAlert(true);
              }}
            >
              Guardar
            </Button>
          )}
          {values.editar && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={() => {
                  console.log(values.fecha_vencimiento);
                  setOpenEditAlert(true);
                }}
              >
                Actualizar
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                variant="contained"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={() => {
                  resetForm();
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
