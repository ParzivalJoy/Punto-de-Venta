import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import esLocale from "date-fns/locale/es";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default function CalendarTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
      {/* <DatePicker value={selectedDate} onChange={handleDateChange} />
      <TimePicker value={selectedDate} onChange={handleDateChange} /> */}
      {/* <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Fecha de expiración"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      /> */}
      
      {/* <KeyboardDateTimePicker ->*/}
      <DateTimePicker
        // label="Fecha de expiraciÃ³n"
        invalidDateMessage="Por favor, de click en el calendario y seleccione una fecha"
        label={props.label ? props.label : ""}
        helperText= {props.helperText ||  "De click en el campo de texto para ingresar la fecha de vencimiento del premio"}
        value={props.value}
        // minDate={new Date()}
        // placeholder="12/01/2027 18:00"
        // format="dd/MM/yyyy HH:mm"
        // clearable
        onChange={date => {
          // handleDateChange(date);
          // console.log(date.toString());
          // console.log(date.toISOString());
          // console.log(date.toDateString());
          // console.log(date.toLocaleDateString());
          // console.log(date.valueOf());
          props.setFieldValue(`${props.field}`, date.toISOString());
        }}
        onFocus={props.onFocus}
        error={props.error}
      />
    </MuiPickersUtilsProvider>
  );
}
