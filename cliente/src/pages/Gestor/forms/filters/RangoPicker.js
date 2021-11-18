import React from "react";
import ReactDOM from "react-dom";
import Switch from "./Switch";
import CheckBox from "./CheckBox";
import TextField from "@material-ui/core/TextField";

export default function RangoPicker() {
  const notificaciones = [
    {
      value: "ninguna",
      label: "Básica"
    },
    {
      value: "premio",
      label: "Premio"
    },
    {
      value: "encuesta",
      label: "Encuesta"
    }
  ];
  return (
    <>
      <CheckBox />
      {/* <TextField
        id="outlined-select-currency"
        select
        label="Tipo de notificación"
        name="notificaciones"
        value={values.notificaciones.value}
        onChange={event => {
          setFieldValue("notificaciones.value", event.target.value);
        }}
        helperText="Por favor seleccione algún tipo de notificación"
        variant="outlined"
      >
        {notificaciones.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
    </>
  );
}
