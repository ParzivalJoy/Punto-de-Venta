import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import 'moment/locale/es'; 

import { useFormikContext, Formik, Field, FieldArray } from "formik";

import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";


moment.locale('es')

const useStyles = makeStyles({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    // overflow: "hidden",
    // // backgroundColor: theme.palette.background.paper,
    maxWidth: 150,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const { values, setFieldValue, resetForm } = useFormikContext();

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5] || 0, b[6] || 0)
    );
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  return (
    <Card className={classes.root} id={props._id}>
      {openAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar acción"
          body="Esta seguro de que desea eliminar este elemento"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openAlert}
          action={async () =>
            await axios
              .delete(`${apiUrl}/niveles/${props._id}`, {
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
      <CardContent>
        <Typography variant="h5" component="h2">
          Nivel: {props.num_puntos}
        </Typography>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Días de vigencia: {props.dias_vigencia}
        </Typography> */}
        <Typography
          // className={classes.title}
          variant="body2"
          color="textSecondary"
          gutterBottom
        >
          {/* Fecha de vencimiento {parseISOString(props.fecha_vencimiento)} */}
          Vencimiento: {moment(props.fecha_vencimiento.substring(0, 23).concat('Z')).fromNow()}
        </Typography>
        <Typography variant="body2" component="p">
          Fecha de creación: {parseISOString(props.fecha_creacion)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setFieldValue("_id", props._id);
            setFieldValue("id_notificacion", props.id_notificacion);
            setFieldValue("id_promocion", props.id_promocion);
            // setFieldValue("dias_vigencia", props.dias_vigencia);
            setFieldValue("fecha_vencimiento", props.fecha_vencimiento.substring(0, 23).concat('Z'));
            // setFieldValue("max_canjeos", props.max_canjeos);
            setFieldValue("num_puntos", props.num_puntos);
            setFieldValue("editar", true);
          }}
        >
          Editar
        </Button>
        <Button
          size="small"
          onClick={() => setOpenAlert(true)}
          color="secondary"
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
