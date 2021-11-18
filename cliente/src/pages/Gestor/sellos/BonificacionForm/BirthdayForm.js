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
import { DisplayFormikState } from "../../forms/formik-helper";
import CurrentPromo from "./CurrentPromo";
import AlertDialogProgressResend from "../../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../../shared/constants";

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
          vigencia: "",
          trigger: "",
          puntos: 0,  
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
          titulo: Yup.string()
            .min(1, "Must be 15 characters or less")
            .required("Required"),
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
          </Grid>
        )}
      </Formik>
    </>
  );
}
