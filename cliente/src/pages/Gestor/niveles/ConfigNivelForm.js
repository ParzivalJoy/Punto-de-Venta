import React, { useState, withStyles } from "react";

import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";
import useBubbletownApi from "../helpers/useBubbletownApi";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function NivelForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  // const [addLevelForm, setAddLevelForm] = React.useState(false);
  const { data: config, loading } = useBubbletownApi({
    path: `config`,
  });

  function getFormatedJustIds(array) {
    return array.map((i) => i.value);
  }

  if (loading) return <CircularProgress />;
  return (
    <Formik
      initialValues={{
        equivalencia_punto_pesos: config.equivalencia_punto_pesos || "",
      }}
      validationSchema={Yup.object({
        equivalencia_punto_pesos: Yup.number()
          .typeError("El campo puntos debe ser de tipo numérico")
          .min(0, "Solo se admiten valores positivos y cero")
          .required("Requerido"),
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
        /* and other goodies */
      }) => (
        <Grid container spacing={3}>
          {openAlert && (
            <AlertDialogProgressResend
              titulo="Confirmar acción"
              body="Esta seguro de que desea guardar este elemento"
              agree="Aceptar"
              disagree="Cancelar"
              switch={openAlert}
              action={async () =>
                await axios
                  .put(
                    `${apiUrl}/config`,
                    {
                      equivalencia_punto_pesos: values.equivalencia_punto_pesos,
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
                {"Sistema de niveles"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-NpuntosGastdos"
              label="Equivalencia de un punto a pesos"
              value={values.equivalencia_punto_pesos}
              onChange={(event) => {
                if (event.target.value.length === 0) {
                  setFieldValue("equivalencia_punto_pesos", event.target.value);
                } else {
                  let value = parseInt(event.target.value, 10);
                  if (isNaN(value)) value = event.target.value;
                  setFieldValue("equivalencia_punto_pesos", value);
                }
              }}
              helperText="1 peso en compras a cuantos puntos equivale?"
              error={Boolean(
                errors.equivalencia_punto_pesos &&
                  touched.equivalencia_punto_pesos
              )}
              onFocus={() => setFieldTouched("equivalencia_punto_pesos")}
            />
            {errors.equivalencia_punto_pesos && touched.equivalencia_punto_pesos && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.equivalencia_punto_pesos}
              </div>
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
                disabled={
                  typeof values.equivalencia_punto_pesos !== "number" ||
                  values.equivalencia_punto_pesos == undefined ||
                  values.equivalencia_punto_pesos.lenght === "null"
                }
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
