import React from "react";
import {
  useFormikContext,
  Formik,
  Form,
  Field,
  FieldArray,
  getIn,
} from "formik";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

import ImagePreview from "../cropper/ImagePreview";
import { DisplayFormikState } from "./formik-helper";
import AlertDialog from "../shared/AlertDialog";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { apiUrl } from "../shared/constants";

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

  return (
    <>
      <Grid item xs={12}>
        <Typography
          style={{ paddingTop: "4px" }}
          variant="subtitle1"
          color="inherit"
        >
          Respuestas
        </Typography>
      </Grid>
      <FieldArray
        id={`encuesta.paginas[${props.pageCounter}].opciones`}
        name={`encuesta.paginas[${props.pageCounter}].opciones`}
        render={(arrayHelpers) =>
          values.encuesta.paginas[props.pageCounter].opciones &&
          values.encuesta.paginas[props.pageCounter].opciones.length > 0 ? (
            <>
              {values.encuesta.paginas[props.pageCounter].opciones.map(
                (friend, index) => (
                  <Grid
                    style={{ padding: "12px" }}
                    container
                    spacing={1}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <TextField
                        label={`Opción ${index + 1}`}
                        name={`encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`}
                        value={
                          values.encuesta.paginas[props.pageCounter].opciones[
                            index
                          ].calificacion
                        }
                        multiline
                        rowsMax="3"
                        onChange={(event) => {
                          setFieldValue(
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`,
                            event.target.value
                          );
                        }}
                        helperText="Ingrese alguna posible respuesta"
                        error={Boolean(
                          getIn(
                            errors,
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                          ) &&
                            Boolean(
                              getIn(
                                touched,
                                `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                              )
                            )
                        )}
                        onFocus={() =>
                          setFieldTouched(
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                          )
                        }
                      />
                      {Boolean(
                        getIn(
                          errors,
                          `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                        )
                      ) &&
                        Boolean(
                          getIn(
                            touched,
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                          )
                        ) && (
                          <div style={{ color: "red", marginTop: ".5rem" }}>
                            {getIn(
                              errors,
                              `encuesta.paginas.${props.pageCounter}.opciones.${index}.calificacion`
                            )}
                          </div>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label={`Ponderación ${index + 1}`}
                        type="number"
                        name={
                          `encuesta.paginas.${props.pageCounter}.opciones.${index}`
                            .rubrica
                        }
                        value={
                          values.encuesta.paginas[props.pageCounter].opciones[
                            index
                          ].rubrica
                        }
                        multiline
                        rowsMax="3"
                        onChange={(event) => {
                          var value = parseFloat(event.target.value);
                          if (isNaN(value)) value = event.target.value;
                          setFieldValue(
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`,
                            value
                          );
                        }}
                        helperText="Ingrese algún número. Qué valor númerico (ponderación) le otorgas a esta respuesta?"
                        error={Boolean(
                          getIn(
                            errors,
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                          ) &&
                            Boolean(
                              getIn(
                                touched,
                                `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                              )
                            )
                        )}
                        onFocus={() =>
                          setFieldTouched(
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                          )
                        }
                      />
                      {Boolean(
                        getIn(
                          errors,
                          `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                        )
                      ) &&
                        Boolean(
                          getIn(
                            touched,
                            `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                          )
                        ) && (
                          <div style={{ color: "red", marginTop: ".5rem" }}>
                            {getIn(
                              errors,
                              `encuesta.paginas.${props.pageCounter}.opciones.${index}.rubrica`
                            )}
                          </div>
                        )}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      className={classes.gridCenter}
                      id="gridCenter"
                    >
                      <Button
                        size="small"
                        className={classes.buttonPlusMinus}
                        variant="outlined"
                        color="secondary"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        className={classes.buttonPlusMinus}
                        onClick={() =>
                          arrayHelpers.push({
                            icon: `${apiUrl}/download/notificacionIcon1.png`,
                            calificacion: "",
                            rubrica: "",
                          })
                        } // insert an empty string at a position
                      >
                        +
                      </Button>
                    </Grid>
                  </Grid>
                )
              )}
              {/* <Grid item xs={12}>
                <button
                  class="ui orange basic button"
                  onClick={() => {
                    arrayHelpers.remove(props.pageCounter);
                  }}
                >
                  Eliminar esta página (Página {props.pageCounter + 1})
                </button>
              </Grid> */}
            </>
          ) : (
            // <ThemeProvider theme={theme}>
            <Button
              id="22"
              variant="outlined"
              style={{ color: "#115293", borderColor: "#11529" }}
              // color="info"
              onClick={() =>
                arrayHelpers.push({
                  icon: `notificacionIcon1.png`,
                  calificacion: "",
                  rubrica: "",
                })
              }
            >
              {/* show this when user has removed all friends from the list */}
              Agregar opciones de respuestas
            </Button>
            // </ThemeProvider>
          )
        }
      />
    </>
  );
}
