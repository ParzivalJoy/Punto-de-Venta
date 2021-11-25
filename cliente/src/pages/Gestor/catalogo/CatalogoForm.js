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
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";

import DatePicker from "../forms/calendarField";
import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));
//<DisplayFormikState {...values} /> 
export default function CatalogoForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  return (
    <Formik
      initialValues={{
        titulo: "",
        descripcion: "",
        tipo: "",
        vigencia: Date.now(),
        icono: {
          file: null,
          fileUrl: null,
          filename: "image_cropped",
          fileUrlCropped: null,
          fileCropped: null,
          downloadUrl: null,
          status: "",
          isCroppedCompleted: false,
        },
      }}
      validationSchema={Yup.object({
        titulo: Yup.string().required("Requerido"),
        descripcion: Yup.string().required("Requerido"),
        tipo: Yup.string().required("Requerido"),
        vigencia: Yup.string().required("Required"),
        icono: Yup.object().shape({
          status: Yup.mixed()
            .notOneOf(
              ["loaded"],
              "Requerido, Aún no ha subido su imagen, de click en SUBIR ICONO"
            )
            .required("Campo requerido"),
        }),
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
              body="Esta seguro de que desea guardar este elemento"
              agree="Aceptar"
              // disagree="Cancelar"
              switch={openAlert}
              action={async () =>
                await axios
                  .post(
                    `${apiUrl}/catalogo`,
                    {
                      titulo: values.titulo,
                      descripcion: values.descripcion,
                      tipo: values.tipo,
                      fecha_vigencia: values.vigencia,
                      imagen: values.icono.filename,
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
                {"Nuevo elemento del catálogo"}
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
              helperText="Ingrese el nombre del producto"
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
              helperText="Describe tu producto. Quizá, qué es?, qué contiene?, cuál es el atractivo?"
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
              label="Tipo"
              select
              name={values.tipo}
              value={values.tipo}
              helperText="Seleccione un tipo de producto. Solo las bebidas y alimentos aparecerán en la app"
              onChange={(event) => {
                setFieldValue("tipo", event.target.value);
              }}
              error={Boolean(errors.tipo && touched.tipo)}
              onFocus={() => setFieldTouched("tipo")}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value={"Bebidas"}>Bebida</MenuItem>
              <MenuItem value={"Alimentos"}>Alimento</MenuItem>
              <MenuItem value={"Otro"}>Otro</MenuItem>
            </TextField>
            {errors.tipo && touched.tipo && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.tipo}
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
            <DatePicker
              setFieldValue={setFieldValue}
              field={"vigencia"}
              value={values.vigencia}
              helperText={
                "De click para ingresar la fecha de vencimiento de este producto en el catalogo. No desaparecerá de la aplicación móvil cuando esta caduque"
              }
            />
            {errors.vigencia && touched.descripcion && touched.tipo && (
              <div style={{ color: "red", marginTop: "3px" }}>
                {errors.vigencia}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <ImagePreview
              icono={values.icono}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar imagen"
              iconoFormikname="icono"
              aspectRatioFraction={119 / 144}
            />
            {Boolean(getIn(errors, "icono.status")) &&
              touched.titulo &&
              touched.descripcion &&
              touched.tipo && (
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ color: "red", marginTop: ".5rem" }}
                >
                  {getIn(errors, "icono.status")}
                </Typography>
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
