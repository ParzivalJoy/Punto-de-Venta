import React from "react";
import axios from "axios";
import {apiUrl} from "../shared/constants"; 

import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import AlertDialogSlide from "../shared/AlertDialogSlide";
import AlertDialogProgressResend from "./AlertDialogResend";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default class RemoteData extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      data: [
        // {
        //   tipo_notificacion: "ninguna",
        //   _id: "5e5a6ed13293dc8a80d4264b",
        //   fecha: "2020-02-29T14:01:53.496000",
        //   titulo: "Hola a todos"
        // },
        // {
        //   tipo_notificacion: "premio",
        //   _id: "5e65e04e40f779d798273300",
        //   fecha: "2020-02-29T14:04:04.103000",
        //   titulo: "asd"
        // },
        // {
        //   tipo_notificacion: "encuesta",
        //   _id: "5e66c14c39eaf11ad412ac3d",
        //   fecha: "2020-02-29T14:04:04.103000",
        //   titulo: "asd"
        // }
      ],
      edit: false,
      resend: false,
      id: "",
      tipo: "",
      res: {}
    };
  }

  handleColorNotif(tipo) {
    switch (tipo) {
      case "ninguna":
        return <Badge color="primary" badgeContent={""} />;
      case "premio":
        return <Badge color="secondary" badgeContent={""} />;
      case "encuesta":
        return <Badge color="error" badgeContent={""} />;
      default:
        return <Badge color="default" badgeContent={""} />;
    }
  }

  parseISOString(s) {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    // console.log(time.toString());
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  }

  render() {
    return (
      <>
        <AlertDialogSlide
          key={this.state.id}
          idp={this.state.id}
          titulo="Editar notificación"
          // body="{<EditRow/>}"
          agree="Confirmar"
          disagree={"Cerrar ventana de edición"}
          // disagree={this.state.id}
          setFieldValue={() => {
            this.setState({ edit: false });
          }}
          // sendProgress={values.sendProgress}
          switch={this.state.edit}
          // action={}
        />
        {this.state.resend && (
          <AlertDialogProgressResend
            titulo="Confirmar reenvío"
            body="Esta seguro de que desea reenviar la notificación?"
            agree="Aceptar"
            disagree="Cancelar"
            // setFieldValue={() => {}}
            // sendProgress={0}
            switch={this.state.resend}
            action={async () =>
              await axios
                .post(
                  `${apiUrl}/admin/notificaciones/${this.state.id}/acciones/${this.state.tipo}`
                )
                .then(res => {
                  if (res.status === 200) return 2;
                  else return 3;
                  // else Show a error message
                  // let data = this.state.data;
                  // const index = data.indexOf(oldData);
                  // data.splice(index, 1);
                  // this.setState({ data }, () => resolve());
                })
                .catch(e => {
                  console.log(e);
                  return 3;
                  // setFieldValue("sendProgress", 3);
                })
            }
            close={() => {
              this.setState({ resend: false });
              console.log("click cerrar");
              return 2;
            }}
          />
        )}
        <MaterialTable
          key={123335}
          tableRef={this.tableRef}
          title="Historial de notificaciones"
          columns={[
            { title: "Título", field: "titulo" },
            {
              title: "Tipo de notificación",
              field: "tipo_notificacion"
            },
            {
              title: "Color ",
              field: "tipo_notificacion",
              render: rowData =>
                this.handleColorNotif(rowData.tipo_notificacion)
            },
            { title: "Id", field: "_id" },
            {
              title: "Fecha",
              field: "fecha",
              render: rowData => this.parseISOString(rowData.fecha)
            }
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "Ningún resultado para mostrar",
              editRow: {
                deleteText: "Esta seguro que deseas eliminar esta notificación?"
              },
              filterRow: {
                filterTooltip: "Filtrar"
              }
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "Filas"
            },
            toolbar: {
              nRowsSelected: "{0} fila(s) seleccionada(s)"
            },
            header: {
              actions: "Acciones"
            }
           
          }} 
          options={{
              pageSizeOptions: [10, 100, 500]
            }}
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                axios
                  .delete(
                    `${apiUrl}/admin/notificaciones/${oldData._id}/acciones/${oldData.tipo_notificacion}`
                  )
                  .then(res => {
                    // if (res.status === 200) setFieldValue("sendProgress", 2);
                    // else Show a error message
                    let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve());
                  })
                  .catch(e => {
                    console.log(e);
                    reject();
                    // setFieldValue("sendProgress", 3);
                  });
              })
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Enviar de nuevo",
              onClick: (event, rowData) =>
                this.setState({
                  id: rowData._id,
                  tipo: rowData.tipo_notificacion,
                  resend: true
                })
            },
            {
              icon: "refresh",
              tooltip: "Actualizar datos",
              isFreeAction: true,
              onClick: () =>
                this.tableRef.current && this.tableRef.current.onQueryChange()
            },
            {
              icon: "edit",
              tooltip: "Editar notificación",
              onClick: (event, rowData) => {
                this.setState({ id: rowData._id, edit: true });
              }
            }
          ]}
          // data={this.state.data}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `${apiUrl}/notificaciones`;
              // url += "per_page=" + query.pageSize;
              // url += "&page=" + (query.page + 1);
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  // console.log(result);
                  resolve({
                    data: result,
                    page: 0,
                    totalCount: 100
                  });
                });
            })
          }
        />
      </>
    );
  }
}
