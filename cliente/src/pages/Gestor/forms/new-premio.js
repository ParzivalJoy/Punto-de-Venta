import React from "react";
import { useFormikContext, Formik, Form, Field, getIn } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "./ImagePreviewFormik";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function NotificacionForm(props) {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormikContext();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" color="inherit">
              {props.editar ? "" : "Nuevo Premio"}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tí­tulo.*"
            name={values.premio.titulo}
            value={values.premio.titulo}
            onChange={(event) => {
              setFieldValue("premio.titulo", event.target.value);
            }}
            error={Boolean(
              getIn(errors, "premio.titulo") &&
                Boolean(getIn(touched, "premio.titulo"))
            )}
            onFocus={() => setFieldTouched("premio.titulo")}
          />
          {Boolean(getIn(errors, "premio.titulo")) &&
            Boolean(getIn(touched, "premio.titulo")) && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {getIn(errors, "premio.titulo")}
              </div>
            )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-Npuntos"
            label="Máximo número de canjeos"
            value={values.premio.vidas}
            onChange={(event) => {
              let value = parseInt(event.target.value, 10);
              if (isNaN(value)) value = event.target.value;
              setFieldValue("premio.vidas", value);
            }}
            helperText="Número de veces que se podrá canjear la bonificacion de este nive. Por favor ingrese algún número"
            error={Boolean(
              getIn(errors, "premio.vidas") &&
                Boolean(getIn(touched, "premio.vidas"))
            )}
            onFocus={() => setFieldTouched("premio.vidas")}
          />
          {Boolean(getIn(errors, "premio.vidas")) &&
            Boolean(getIn(touched, "premio.vidas")) && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {getIn(errors, "premio.vidas")}
              </div>
            )}
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            id="filled-textarea"
            label="Contenido.*"
            multiline
            variant="outlined"
            rows="3"
            name={values.premio.contenido}
            value={values.premio.contenido}
            onChange={event => {
              setFieldValue("premio.contenido", event.target.value);
            }}
          />
        </Grid> */}
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoMiniatura}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen miniatura"
            iconoFormikname="iconoMiniatura"
            aspectRatioFraction={99 / 105}
          />
          {Boolean(getIn(errors, "iconoMiniatura.status")) &&
            Boolean(getIn(touched, "premio.vidas")) &&
            Boolean(getIn(touched, "premio.titulo")) && (
              <Typography
                variant="caption"
                gutterBottom
                style={{ color: "red", marginTop: ".5rem" }}
              >
                {getIn(errors, "iconoMiniatura.status")}
              </Typography>
            )}
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoDetalles}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen detalles"
            iconoFormikname="iconoDetalles"
            aspectRatioFraction={224 / 431}
          />{" "}
          {Boolean(getIn(errors, "iconoDetalles.status")) &&
            Boolean(getIn(touched, "premio.vidas")) &&
            Boolean(getIn(touched, "premio.titulo")) && (
              <Typography
                variant="caption"
                gutterBottom
                style={{ color: "red", marginTop: ".5rem" }}
              >
                {getIn(errors, "iconoDetalles.status")}
              </Typography>
            )}
        </Grid>
      </Grid>
    </form>
  );
}
