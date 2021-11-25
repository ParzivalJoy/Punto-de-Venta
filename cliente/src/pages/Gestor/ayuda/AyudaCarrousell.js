import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import AyudaForm from "./AyudaForm";
import VerticalImageGrid from "./VerticalImageGrid";
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
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
          /* and other goodies */
        }) => (
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid> */}
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <VerticalImageGrid />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className="card">
                <AyudaForm />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
}
