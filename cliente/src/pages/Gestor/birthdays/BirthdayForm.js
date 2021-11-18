import React, { useState, makeStyles, withStyles } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import NotificacionListGridGallery from "./NotificacionListGridGallery";
import PremioListGridGallery from "./PremioListGridGallery";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
// import Demo from "../helpers/dm";
import InputBase from "@material-ui/core/InputBase";
import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";
import CurrentPromo from "./CurrentPromo";
import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const vigencia = [
  {
    value: "5 dias antes y despues",
    label: "5 días antes y despúes",
  },
  {
    value: "10 dias antes y despues",
    label: "10 días antes y despúes",
  },
  {
    value: "solo durante el dia de su cumpleanos",
    label: "Sólo durante el día de su cumpleaños",
  },
  {
    value: "durante el mes de su cumpleanos",
    label: "Durante el mes de su cumpleaños",
  },
];

export default function BirthdayForm() {
  const [formState, setFormState] = React.useState({
    notificacion: "",
    promocion: "",
    vigencia: "",
    trigger: "",
    antiguedad: "",
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertEnviarAhora, setOpenAlertEnviarAhora] = React.useState(false);
  const [okmessage, setOkmessage] = React.useState("");

  return (
    <>
      <Formik
        initialValues={{
          id_notificacion: "",
          id_promocion: "",
          trigger: "",
          antiguedad: "",
          vigencia: "",
        }}
        validationSchema={Yup.object().shape({
          id_notificacion: Yup.string().required("Requerido"),
          id_promocion: Yup.string().required("Requerido"),
          trigger: Yup.number()
            .typeError("El campo puntos debe ser de tipo numérico")
            .positive("Solo se admiten valores positivos")
            .required("Requerido"),
          antiguedad: Yup.number()
            .typeError("El campo puntos debe ser de tipo numérico")
            .min(0, "Solo se admiten valores positivos y cero")
            .required("Requerido"),
          vigencia: Yup.string().required("Required"),
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
          setFieldTouched,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <Grid container spacing={3}>
            {openAlert && (
              <AlertDialogProgressResend
                titulo="Confirmar acción"
                body="Esta seguro de que desea guardar el premio de cumpleaños"
                agree="Aceptar"
                disagree="Cancelar"
                switch={openAlert}
                action={async () =>
                  await axios
                    .put(`${apiUrl}/birthday`, values, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
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
            {openAlertEnviarAhora && (
              <AlertDialogProgressResend
                titulo="Confirmar acción"
                body="Esta seguro de que desea enviar a los participantes?"
                okmessage={okmessage}
                agree="Aceptar"
                disagree="Cancelar"
                switch={openAlertEnviarAhora}
                action={async () =>
                  await axios
                    .post(`${apiUrl}/birthday/cualquiercosa`, values, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        setOkmessage(JSON.stringify(res.data));
                        return 2;
                      } else return 3;
                    })
                    .catch((e) => {
                      console.log(e);
                      return 3;
                      // setFieldValue("sendProgress", 3);
                    })
                }
                close={() => {
                  setOpenAlertEnviarAhora(false);
                  console.log("click cerrar");
                  return 2;
                }}
              />
            )}
            <Grid item xs={12}>
              <CurrentPromo />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="inherit">
                Configurar bonificaciones de cumpleaños
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccionar notificación"
                name="notificaciones"
                // disabled={props.editar}
                value={formState.notificacion}
                // onChange={event => {
                //   // setFieldValue("notificaciones.value", event.target.value);
                //   setFormState(prevState => ({ ...prevState, 'notificacion': "5e7bdf4da36b5ac9b43604a"}));
                //   console.log (formState.notificacion);
                // }}
                helperText="Por favor, seleccione algún tipo de notificación. ¿Qué notificación de cumpleaños recibirán los participantes?. Recuerda que debes crearla previamente en la pestaña Formularios y debe ser de tipo preferente: PREMIO y enviarsela a 0 participantes"
                variant="outlined"
                error={Boolean(
                  errors.id_notificacion && touched.id_notificacion
                )}
                onFocus={() => setFieldTouched("id_notificacion")}
              >
                <NotificacionListGridGallery
                  value={formState.notificacion}
                  label={"seleccion"}
                  handleChange={(n) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      notificacion: n,
                    }));
                    console.log(n);
                    setFieldValue("id_notificacion", n);
                  }}
                >
                  {formState.notificacion}
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
                value={formState.promocion}
                handleChange={(n) => {
                  setFormState((prevState) => ({ ...prevState, promocion: n }));
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
            <Grid item xs={6}>
              <TextField
                label="Trigger (Días previos)"
                type="number"
                // name={values.titulo}
                value={values.trigger >= 0 ? values.trigger : ""}
                helperText="Días de antelación a la fecha de cumpleaños del participante en el que será enviada la notificación"
                onChange={(event) => {
                  let value = parseInt(event.target.value, 10);
                  if (isNaN(value)) value = event.target.value;
                  setFieldValue("trigger", value);
                }}
                error={Boolean(errors.trigger && touched.trigger)}
                onFocus={() => setFieldTouched("trigger")}
              />
              {errors.trigger && touched.trigger && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.trigger}
                </div>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Antiguedad necesaria (Días)"
                type="number"
                // name={values.titulo}
                value={values.antiguedad >= 0 ? values.antiguedad : ""}
                helperText="Dias de antiguedad como cliente desde la fecha de registro en la aplicación móvil de el programa de lealtad suficientes para ser merecedor a este premio. ¿A cuántos días se es digno?"
                onChange={(event) => {
                  let value = parseInt(event.target.value, 10);
                  if (isNaN(value)) value = event.target.value;
                  setFieldValue("antiguedad", value);
                }}
                error={Boolean(errors.antiguedad && touched.antiguedad)}
                onFocus={() => setFieldTouched("antiguedad")}
              />
              {errors.antiguedad && touched.antiguedad && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.antiguedad}
                </div>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-vigencia"
                select
                label="Vigencia"
                name="notificaciones"
                // disabled={props.editar}
                value={values.vigencia || ""}
                onChange={(event) => {
                  setFieldValue("vigencia", event.target.value);
                }}
                helperText="Días válidos para canjear el premio. Nada es para siempre"
                variant="outlined"
                error={Boolean(errors.vigencia && touched.vigencia)}
                onFocus={() => setFieldTouched("vigencia")}
              >
                {vigencia.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {errors.vigencia && touched.vigencia && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.vigencia}
                </div>
              )}
            </Grid>
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
            <Box p={2}>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<Icon>send</Icon>}
                onClick={() => {
                  setOpenAlertEnviarAhora(true);
                }}
              >
                Enviar ahora!
              </Button>
            </Box>
            {/* <Box p={2}>
              <Button variant="outlined" color="default" disabled>
                Vista Previa
              </Button>
            </Box> */}
            <DisplayFormikState {...values} /> 
          </Grid>
        )}
      </Formik>
    </>
  );
}
