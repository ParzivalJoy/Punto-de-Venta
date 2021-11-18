import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { green, purple } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";

import ReactSelectMultiAnimated from "./ReactSelectMulti";
import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    // color: theme.palette.text.secondary
  },
}));

export default function AyudaCarrousell() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          _id: "",
          isEditEnabled: false,
          titulo: "",
          descripcion: "",
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
          setFieldTouched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
          /* and other goodies */
        }) => (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant="h5" color="inherit" style={{'marginBottom':'15px'}}>
                    {"Participantes"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary">
                    Eliminar premios de participantes
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Eliminar premios de participantes
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
}
