import React from "react";
import ReactDOM from "react-dom";
import { DateRangePicker } from "rsuite";
import {
  addDays,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns"; // choose your lib

// import default style
//import "rsuite/lib/styles/index.less"; // or 'rsuite/dist/styles/rsuite-default.css'
//import "rsuite/dist/styles/rsuite-default.css";

export default function DateRange(props) {
  return (
    <DateRangePicker
      placeholder={"Seleccione un rango de fechas"}
      locale={{
        sunday: "Do",
        monday: "Lu",
        tuesday: "Ma",
        wednesday: "Mi",
        thursday: "Ju",
        friday: "Vi",
        saturday: "Sá",
        ok: "OK",
        today: "Hoy",
        yesterday: "Ayer",
        last7Days: "Últimos 7 días",
      }}
      // value={[props.valueStart, props.valueEnd]}
      ranges={[]}
      onOk={(event) => {
        props.onFocus();
        props.setFieldValue(`${props.field1}`, event[0]);
        props.setFieldValue(`${props.field2}`, event[1]);
        console.log(event);
      }}
      onChange={(event) => {
        props.setFieldValue(`${props.field1}`, event[0]);
        props.setFieldValue(`${props.field2}`, event[1]);
      }}
      onClean={(event) => {
        props.onFocus();
        props.setFieldValue(`${props.field1}`, new Date().toISOString);
        props.setFieldValue(`${props.field2}`, "");
        console.log(event);
      }}
      // onClose={event => props.onFocus()}
      // onExit={event => props.onFocus()}
      //   TODO: Agregar ranges, ver la documentación
    />
  );
}

// import React from "react";
// import ReactDOM from "react-dom";
// import { Button, DateRangePicker } from "rsuite";

// // import default style
// import "rsuite/lib/styles/index.less"; // or 'rsuite/dist/styles/rsuite-default.css'
// import "rsuite/dist/styles/rsuite-default.css";

// function App() {
//   return <DateRangePicker placeholder={"Seleccione un rango de fechas"} />;
// }

// ReactDOM.render(<App />, document.getElementById("root"));
