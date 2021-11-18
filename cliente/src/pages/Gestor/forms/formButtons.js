import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useFormikContext } from "formik";

import axios from "axios";
import { apiUrl } from "../shared/constants";

import AlertDialogControlled from "../shared/AlertDialogProgress";
const useStyles = makeStyles((theme) => ({
  actionsButtons: {
    marginTop: "15px",
  },
  buttondown: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(0),
  },
}));

export default function FormButtons(props) {
  const classes = useStyles();
  const {
    values,
    submitForm,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    onSubmit,
    isValid,
    setSubmitting,
  } = useFormikContext();
  // const p = useFormikContext();
  // console.log(p);

  // function sendEditar(){
  //
  //
  //
  //
  // }
  //

  function sendFormBasica(props) {
    var url;
    if (!props.editar) {
      url = `${apiUrl}/notificaciones`;
      axios
        .post(
          `${url}`,
          {
            titulo: values.titulo,
            mensaje: values.contenido,
            // fecha: "2019-12-19T05:28:40.247",
            imagenIcon: `${values.icono.filename}`,
            imagenDisplay: `${values.iconoDisplay.filename}`,
            // bar_text: values.textoAccionador,
            tipo_notificacion: values.notificaciones.value,
            // link: "5e3540ffdb5584c6403a6332",
            filtros: values.participantesFor,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          setFieldValue("sendProgress", 2);
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      url = `${apiUrl}/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          `${url}`,
          {
            notificacion: {
              titulo: values.titulo,
              mensaje: values.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.filename}`,
              // imagenDisplay: `${values.iconoDisplay.filename}`,
              // bar_text: values.textoAccionador,
              tipo_notificacion: values.notificaciones.value,
              // link: "5e3540ffdb5584c6403a6332",
              filtros: values.participantesFor,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          setFieldValue("sendProgress", 2);
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  function sendFormPremio() {
    var url;
    if (!props.editar) {
      axios
        .post(
          `${apiUrl}/premios`,
          {
            nombre: values.premio.titulo,
            // fecha: "2019-12-19T05:28:40.247",
            imagen_icon: `${values.iconoMiniatura.filename}`,
            imagen_display: `${values.iconoDetalles.filename}`,
            // imagen_icon: `${apiUrl}/download/${values.iconoMiniatura.filename}`,
            // imagen_display: `${apiUrl}/download/${values.iconoDetalles.filename}`,
            puntos: parseFloat(`${values.puntos}`) || 0, //opcional
            vidas: values.premio.vidas || 0
            // link: "5e3540ffdb5584c6403a6332",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200)
            axios
              .post(
                `${apiUrl}/notificaciones`,
                {
                  link: res.data.ObjectId._id,
                  titulo: values.premio.titulo,
                  mensaje: values.premio.contenido,
                  // fecha: "2019-12-19T05:28:40.247",
                  imagenIcon: `${values.icono.filename}`,
                  // imagenIcon: `${apiUrl}/download/${values.icono.filename}`,
                  bar_text: values.textoAccionador,
                  textoAccionador: values.notificaciones.textoAccionador,
                  tipo_notificacion: values.notificaciones.value,
                  filtros: values.participantesFor,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setFieldValue("sendProgress", 2);
              })
              .catch((e) => {
                console.log(e);
                setFieldValue("sendProgress", 3);
              });
          // else Show a error message
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      url = `${apiUrl}/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          url,
          {
            notificacion: {
              titulo: values.titulo,
              mensaje: values.premio.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.filename}`,
              bar_text: values.textoAccionador,
              // textoAccionador: values.notificaciones.textoAccionador,
              tipo_notificacion: values.notificaciones.value,
              filtros: values.participantesFor,
            }, //opcional
            premio: {
              nombre: values.premio.titulo,
              // fecha: "2019-12-19T05:28:40.247",
              imagen_icon: `${values.iconoMiniatura.filename}`,
              imagen_display: `${values.iconoDetalles.filename}`,
              puntos: parseFloat(`${values.puntos}`) || 0, //opcional
              vidas: values.premio.vidas || 0
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) setFieldValue("sendProgress", 2);
          // else Show a error message
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  function sendFormEncuesta() {
    var url;
    if (!props.editar) {
      values.encuesta.paginas.map((pag, index) => {
        if (pag.tipo === "emoji")
          pag.opciones.map((ops) => {
            if (ops.icon.filename) ops.icon = ops.icon.filename;
          });
      });

      axios
        .post(
          `${apiUrl}/encuesta`,
          {
            titulo: values.encuesta.titulo,
            categoria: values.encuesta.categoria,
            metrica: values.encuesta.metrica,
            // puntos: values.encuesta.puntos,
            paginas: values.encuesta.paginas,
            // fecha: "2019-12-19T05:28:40.247",
            // imagen_icon: `${apiUrl}/download/${
            //   values.iconoMiniatura.filename
            // }`,
            // imagen_display: `${apiUrl}/download/${
            //   values.iconoDetalles.filename
            // }`,
            puntos: parseFloat(values.encuesta.puntos) || 0, //opcional
            // link: "5e3540ffdb5584c6403a6332",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200)
            var idEncuesta = res.data.EncuestaModel_id._id;
          console.log(res.data._id);
          axios
            .post(
              `${apiUrl}/notificaciones`,
              {
                titulo: values.titulo,
                mensaje: values.contenido,
                // fecha: "2019-12-19T05:28:40.247",
                imagenIcon: `${values.icono.filename}`,
                bar_text: values.textoAccionador,
                textoAccionador: values.notificaciones.textoAccionador,
                tipo_notificacion: values.notificaciones.value,
                link: idEncuesta,
                filtros: values.participantesFor,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res);
              // console.log(res.data);
              setFieldValue("sendProgress", 2);
            })
            .catch((e) => {
              console.log(e);
              setFieldValue("sendProgress", 3);
            });

          // else Show a error message
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      values.encuesta.paginas.map((pag, index) => {
        if (pag.tipo == "emoji") {
          pag.opciones.map((ops) => {
            ops.icon = ops.icon.filename;
          });
        }
        if (pag.tipo == "opcion multiple") {
          pag.opciones.map((ops) => {
            ops.icon = `${apiUrl}/download/null.png`;
          });
        }
      });
      url = `${apiUrl}/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          url,
          {
            notificacion: {
              titulo: values.titulo,
              mensaje: values.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.filename}`,
              bar_text: values.textoAccionador,
              textoAccionador: values.notificaciones.textoAccionador,
              tipo_notificacion: values.notificaciones.value,
              // link: idEncuesta
            }, //opcional
            encuesta: {
              titulo: values.encuesta.titulo,
              categoria: values.encuesta.categoria,
              metrica: values.encuesta.metrica,
              // puntos: values.encuesta.puntos,
              paginas: values.encuesta.paginas,
              puntos: parseFloat(values.encuesta.puntos) || 0, 
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) setFieldValue("sendProgress", 2);
          // else Show a error message
        })
        .catch((e) => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  switch (values.notificaciones.value) {
    case "ninguna":
      return (
        <>
          <AlertDialogControlled
            titulo="Confirmar envío"
            body="Esta seguro de que desea enviar la notificación?"
            agree="Aceptar"
            disagree="Cancelar"
            setFieldValue={setFieldValue}
            sendProgress={values.sendProgress}
            switch={values.isCompleted}
            action={() => sendFormBasica(props)}
          />
          <Grid item xs={4} />
          <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="button"
              disabled={props.editar ? true : isSubmitting}
            >
              cancelar
            </Button>
          </Grid>
          {/* <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="button"
              disabled={props.editar ? true : isSubmitting}
            >
              vista previa
            </Button>
          </Grid> */}
          <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="submit"
              onClick={() => setFieldValue("isCompleted", true)}
              disabled={isSubmitting}
            >
              Finalizar
            </Button>
          </Grid>
        </>
      );
    case "premio":
      switch (props.pageCounter) {
        case 0:
          return (
            <>
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : isSubmitting}
                  onClick={() => {
                    props.addSteps(-3);
                  }}
                >
                  Regresar
                </Button>
              </Grid>

              {/* <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid> */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={() => {
                    props.addSteps(3);
                    // console.log(props.activeStep);
                    props.handleNextPage();
                  }}
                  disabled={isSubmitting}
                >
                  Siguiente
                </Button>
              </Grid>
            </>
          );
        case 1:
          return (
            <>
              <AlertDialogControlled
                titulo="Confirmar envío"
                body="Esta seguro de que desea enviar este premio?"
                agree="Aceptar"
                disagree="Cancelar"
                setFieldValue={setFieldValue}
                switch={values.isCompleted}
                sendProgress={values.sendProgress}
                action={sendFormPremio}
              />
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    props.addSteps(-3);
                    props.handleBackPage();
                  }}
                >
                  Regresar
                </Button>
              </Grid>
              {/* <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid> */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={() => {
                    // sendFormPremio();
                    setFieldValue("isCompleted", true);
                  }}
                  disabled={isSubmitting}
                >
                  Finalizar
                </Button>
              </Grid>
            </>
          );
        default:
          return;
      }
    case "encuesta":
      switch (props.activeStep) {
        case 0:
          return (
            <>
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : isSubmitting}
                  onClick={props.handleBack}
                >
                  Regresar
                </Button>
              </Grid>

              {/* <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid> */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={props.handleNext}
                  disabled={isSubmitting}
                >
                  Siguiente
                </Button>
              </Grid>
            </>
          );
        case 1:
          return (
            <Grid container justify="flex-end">
              <AlertDialogControlled
                titulo="Confirmar envío"
                body="Esta seguro de que desea enviar esta encuesta?"
                agree="Aceptar"
                disagree="Cancelar"
                setFieldValue={setFieldValue}
                switch={values.isCompleted}
                action={sendFormEncuesta}
                sendProgress={values.sendProgress}
              />

              <Grid item xs={2} />
              {/* {props.pageCounter === 0 && ( */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={props.handleBack}
                >
                  Regresar
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (props.pageCounter == 0) props.handleBack();
                    else props.handleBackPage();
                    props.arrayHelpers.remove(props.pageCounter);
                  }}
                >
                  Eliminar página
                </Button>
              </Grid>
              {/* )} */}
              {props.pageCounter > 0 && (
                <>
                  <Grid item xs={2}>
                    <Button
                      className={classes.buttondown}
                      color="primary"
                      type="button"
                      disabled={isSubmitting}
                      onClick={props.handleBackPage}
                    >
                      Página anterior
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (props.pageCounter + 2 > props.pageArraySize) {
                      props.arrayHelpers.push({
                        titulo: "",
                        tipo: "opcion multiple",
                        metrica: "",
                        opciones: [
                          {
                            icon: "",
                            calificacion: "",
                            rubrica: null,
                          },
                        ],
                      });
                    }
                    props.handleNextPage();
                  }}
                >
                  Hay más páginas?
                </Button>
              </Grid>
              {/* <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid> */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={
                    () => setFieldValue("isCompleted", true)
                    // props.handleNext
                  }
                  disabled={isSubmitting}
                >
                  Finalizar
                </Button>
              </Grid>
            </Grid>
          );
        default:
          return <></>;
      }
    // TODO: Mover estos botones a el formulario dado que cada pagina
    // representa un estado diferente del mismo
    default:
      return <></>;
    // throw new Error("Unknown step");
  }
}
