import React from "react";
import { useFormikContext, getIn } from "formik";
import { makeStyles } from "@material-ui/core/styles";

// import { DisplayFormikState } from "./formik-helper";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function EncuestaForm(props) {
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormikContext();

  // console.log("page:", props.pageCounter, "   step:", props.activeStep);

  // if (props.activeStep === 0)
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="inherit">
            {props.editar ? "" : "Nueva encuesta"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Título"
            name="Título"
            value={values.encuesta.titulo}
            multiline
            rowsMax="4"
            onChange={(event) => {
              setFieldValue("encuesta.titulo", event.target.value);
            }}
            helperText="Ponle un título a la encuesta, que te permita distinguirla de las demás. Esto no se verá en la aplicación móvil"
            error={Boolean(getIn(errors, 'encuesta.titulo')) && getIn(touched, 'encuesta.titulo')}
            onFocus={() => setFieldTouched("encuesta.titulo")}
          />
          {/* {`${getIn(errors, 'encuesta.titulo')} && ${getIn(touched, 'encuesta.titulo')}`} */}
          {getIn(errors, 'encuesta.titulo') && getIn(touched, 'encuesta.titulo') && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {getIn(errors, 'encuesta.titulo')}
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Categoría"
            name="Categoría"
            value={values.encuesta.categoria}
            multiline
            rowsMax="2"
            onChange={(event) => {
              setFieldValue("encuesta.categoria", event.target.value);
            }}
            helperText="Ingresa un tag para esta encuesta, el clasificar las encuestas te facilitá el orden, distinguir, y agrupar las campañas y resultados de las encuestas"
            error={Boolean(getIn(errors, 'encuesta.categoria')) && Boolean(getIn(touched, 'encuesta.categoria'))}
            onFocus={() => setFieldTouched("encuesta.categoria")}
          />
          {/* {`${getIn(errors, 'encuesta.categoria')} && ${getIn(touched, 'encuesta.categoria')}`} */}
          {getIn(errors, 'encuesta.categoria') && getIn(touched, 'encuesta.categoria') && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {getIn(errors, 'encuesta.categoria')}
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Métrica"
            name={values.encuesta.metrica}
            value={values.encuesta.metrica}
            multiline
            rowsMax="2"
            onChange={(event) => {
              setFieldValue("encuesta.metrica", event.target.value);
            }}
            helperText="Qué quieres medir o conocer con esta encuesta?"
            error={Boolean(getIn(errors, 'encuesta.metrica')) && Boolean(getIn(touched, 'encuesta.metrica'))}
            onFocus={() => setFieldTouched("encuesta.metrica")}
          />
          {/* {`${getIn(errors, 'encuesta.metrica')} && ${getIn(touched, 'encuesta.metrica')}`} */}
          {getIn(errors, 'encuesta.metrica') && getIn(touched, 'encuesta.metrica') && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {getIn(errors, 'encuesta.metrica')}
            </div>
          )}
        </Grid>
      </Grid>
    </form>
  );
  // else return <EncuestaPage pageCounter={props.pageCounter} />;
}
