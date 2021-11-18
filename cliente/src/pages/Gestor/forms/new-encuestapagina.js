import React from "react";
import { useFormikContext, getIn } from "formik";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EncuestaOpcionMultiple from "./EncuestaOpcionMultiple";
import EncuestaReactiva from "./EncuestaReactiva";

const tipoEncuesta = [
  {
    value: "opcion multiple",
    label: "Opción múltiple",
  },
  {
    value: "abierta",
    label: "Abierta",
  },
  {
    value: "emoji",
    label: "Reactiva/Emoji",
  },
];

const segmentacion = [
  {
    value: "todos",
    label: "Ninguna",
  },
  {
    value: "metrica",
    label: "Por métrica",
  },
  {
    value: "montocompra",
    label: "Monto de compra",
  },
  {
    value: "productocompra",
    label: "Al comprar determinado un producto",
  },
];

const theme = createMuiTheme({
  palette: {
    info: green,
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
  TextSubtitle: {
    marginRight: theme.spacing(1),
  },
  buttonPlusMinus: {
    margin: 0,
    alignSelf: "center",
  },
  gridCenter: {
    alignContent: "center",
  },
}));

export default function EncuestaForm(props) {
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
  const [showAlert, setShowAlert] = React.useState(false);

  const getTipoEncuesta = (tipoEncuesta) => {
    switch (tipoEncuesta) {
      case "opcion multiple":
        return <EncuestaOpcionMultiple pageCounter={props.pageCounter} />;
      case "abierta":
        return;
      case "emoji":
        return <EncuestaReactiva pageCounter={props.pageCounter} />;
      default:
        return <div></div>;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant="h6" color="inherit">
            Encuesta
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            style={{ paddingTop: "4px" }}
            variant="subtitle1"
            color="inherit"
          >
            Página {props.pageCounter + 1}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tipo de pregunta"
            name="tipo de pregunta"
            value={values.encuesta.paginas[props.pageCounter].tipo}
            onChange={(event) => {
              setFieldValue(
                `encuesta.paginas[${props.pageCounter}].tipo`,
                event.target.value
              );
            }}
            helperText="Por favor seleccione algún tipo de pregunta"
            variant="outlined"
          >
            {tipoEncuesta.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Pregunta"
            name={values.encuesta.titulo}
            value={values.encuesta.paginas[props.pageCounter].titulo || ""}
            multiline
            rowsMax="3"
            onChange={(event) => {
              setFieldValue(
                `encuesta.paginas[${props.pageCounter}].titulo`,
                event.target.value
              );
            }}
            helperText="Qué quieres preguntar?"
            error={Boolean(
              getIn(errors, `encuesta.paginas[${props.pageCounter}].titulo`) &&
                Boolean(
                  getIn(
                    touched,
                    `encuesta.paginas[${props.pageCounter}].titulo`
                  )
                )
            )}
            onFocus={() =>
              setFieldTouched(`encuesta.paginas[${props.pageCounter}].titulo`)
            }
          />
          {Boolean(
            getIn(errors, `encuesta.paginas[${props.pageCounter}].titulo`)
          ) &&
            Boolean(
              getIn(touched, `encuesta.paginas[${props.pageCounter}].titulo`)
            ) && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {getIn(errors, `encuesta.paginas[${props.pageCounter}].titulo`)}
              </div>
            )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Subcategoría"
            name="Subcategoría"
            value={values.encuesta.paginas[props.pageCounter].metrica || ""}
            multiline
            rowsMax="3"
            onChange={(event) => {
              setFieldValue(
                `encuesta.paginas[${props.pageCounter}].metrica`,
                event.target.value
              );
            }}
            helperText="Ingresa algún texto que te permita clasificar esta pregunta. Puedes ingresar el nombre de indicador que estas midiendo con esta pregunta. Lo más importante, obtendrá respuestas de encuestas estructuradas que producen datos limpios para el análisis"
            error={Boolean(
              getIn(errors, `encuesta.paginas[${props.pageCounter}].metrica`) &&
                Boolean(
                  getIn(
                    touched,
                    `encuesta.paginas[${props.pageCounter}].metrica`
                  )
                )
            )}
            onFocus={() =>
              setFieldTouched(`encuesta.paginas[${props.pageCounter}].metrica`)
            }
          />
          {Boolean(
            getIn(errors, `encuesta.paginas[${props.pageCounter}].metrica`)
          ) &&
            Boolean(
              getIn(touched, `encuesta.paginas[${props.pageCounter}].metrica`)
            ) && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {getIn(errors, `encuesta.paginas[${props.pageCounter}].metrica`)}
              </div>
            )}
        </Grid>
        {getTipoEncuesta(values.encuesta.paginas[props.pageCounter].tipo)}
      </Grid>
    </form>
  );
}
