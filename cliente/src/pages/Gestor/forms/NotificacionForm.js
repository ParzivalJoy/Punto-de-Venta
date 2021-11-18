import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, FieldArray } from "formik";
import Thumb from "./Thumb";
import { DisplayFormikState } from "./formik-helper";
import axios from "axios";
import {apiUrl} from "../shared/constants"; 

import * as Yup from "yup";

const Basic = () => (
  <div>
    <Formik
      initialValues={{
        tipo: "",
        titulo: "",
        icono: {
          file: null,
          data: "",
          status: ""
        },
        textoBarra: "",
        descripcion: "",
        fecha: "",
        link: ""
        // toISOString()
        // fecha: Date().toLocaleString()
      }}
      validationSchema={Yup.object({
        tipo: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required")
        // email: Yup.string()
        //   .email("Invalid email addresss`")
        //   .required("Required"),
        // imagenes: Yup.array()
        //   .min(2, "Agrega al menos dos imagenes")
        //   .of(
        //     Yup.object().shape({
        //       status: Yup.string()
        //         .matches(/(200)/)
        //         .required()
        //     })
        //   )

        // file: Yup.mixed().required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post(
            `${apiUrl}/notificaciones/5e314c51a3a8cbfd5b3a62c0`,
            {
              titulo: "Te gustÃ³ tu bebida?",
              mensaje: "Gracias por tu compra",
              fecha: "2019-12-19T05:28:40.247",
              imagenIcon:
                `${apiUrl}/download/notificacionIcon2.png`,
              bar_text: "Recordar mÃ¡s tarde",
              tipo_notificacion: "encuesta",
              link: "5e3540ffdb5584c6403a6332",
              estado: 0
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
        setTimeout(() => {
          alert(
            JSON.stringify(
              {
                values
              },
              null,
              2
            )
          );
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <h3>Nueva Notificación</h3>
          <label htmlFor="tipo">Tipo de Notificación</label>
          <input
            type="text"
            name="tipo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tipo}
          />
          {errors.tipo && touched.tipo && errors.tipo}
          <label htmlFor="tipo">Título</label>
          <input
            type="text"
            name="titulo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.titulo}
          />
          {errors.password && touched.password && errors.password}
          <label htmlFor="file">Subir ícono</label>
          <div>
            <input
              id={`icono`}
              name={`icono`}
              type="file"
              onChange={event => {
                setFieldValue(`icono.file`, event.currentTarget.files[0]);
                var formData = new FormData();
                formData.append("photo", event.currentTarget.files[0]);
                axios
                  .post(`${apiUrl}/upload`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                  })
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setFieldValue(`icono.data`, res.data);
                    setFieldValue(`icono.status`, res.status);
                  });
                setFieldValue(`icono.status`, "loaded");
              }}
            />
            {values.icono.status === 200 ? (
              <Thumb file={values.icono.file} status="greenbor" />
            ) : (
              <Thumb file={values.icono.file} status="redbor" />
            )}
          </div>
          <label htmlFor="textoBarra">Texto de la barra de navegación</label>
          <input
            type="text"
            name="textoBarra"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.textoBarra}
          />
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            name="descripcion"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.descripcion}
          />

          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
          <DisplayFormikState {...values} /> 
        </form>
      )}
    </Formik>
  </div>
);

export default Basic;

function App() {
  return <Basic />;
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
