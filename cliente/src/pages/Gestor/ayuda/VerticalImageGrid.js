import React, { useState, withStyles } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import useBubbletownApi from "../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertDialogProgressResend from "../home/AlertDialogResend";
import axios from "axios";
import { apiUrl, apiUrlImages } from "../shared/constants";

import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // flexWrap: 'nowrap',
    width: 600,
    height: 720,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  // inputCustom: {
  //   border: "none",
  //   display: "inline-block",
  //   boxSizing: "inherit",
  //   margin: 0,
  //   padding: 0,
  //   // width: 2em,
  //   lineHeight: "inherit",
  //   verticalAlign: "inherit",
  //   textAlign: "right",
  //   color: "inherit",
  //   font: "inherit",
  //   background: "none",
  // },
  //   title: {
  //     color: theme.palette.primary.light,
  //   },
  //   titleBar: {
  //     background:
  //       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  //   },
}));

// const deleteItem = async itemId =>
// };

export default function SingleLineGridList() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [ayudaId, setAyudaId] = React.useState(false);
  const gridRef = React.useRef();
  const { values, setFieldValue, resetForm } = useFormikContext();

  // const [isEditModeEnable, setIsEditModeEnable] = React.useState(false);
  const { data: Ayuda, loading } = useBubbletownApi({
    path: `ayuda`,
  });

  const eliminarItem = async () =>
    await axios
      .delete(`${apiUrl}/ayuda/${ayudaId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(
            (Ayuda.Ayuda = Ayuda.Ayuda.filter((a) => a._id !== ayudaId))
          );
          return 2;
        } else return 3;
      })
      .catch((e) => {
        console.log(e);
        return 3;
        // setFieldValue("sendProgress", 3);
      });

  if (loading) return <CircularProgress />;
  return (
    <div className={classes.root}>
      {openAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar edición"
          body="Esta seguro de que desea eliminar este elemento?"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openAlert}
          action={eliminarItem}
          close={() => {
            setOpenAlert(false);
            console.log("click cerrar");
            return 2;
          }}
        />
      )}
      <GridList
        cellHeight={200}
        className={classes.gridList}
        cols={1}
        ref={gridRef}
      >
        <div class="ui divided items">
          {Ayuda.Ayuda.map((tile) => (
            <div key={tile._id} class="item" style={{ marginBottom: "20px" }}>
              <div class="ui right floated">
                <i
                  class="orange edit outline link icon"
                  onClick={() => {
                    if (!values.isEditedEnabled) {
                      setFieldValue("isEditEnabled", true);
                      setFieldValue("titulo", tile.titulo);
                      setFieldValue("descripcion", tile.descripcion);
                      setFieldValue("icono.filename", tile.imagen_icon);
                      setFieldValue("icono.fileUrl", tile.imagen_icon);
                      setFieldValue("icono.downloadUrl", tile.imagen_icon);
                      setFieldValue("icono.status", "fetched");
                      setFieldValue("_id", tile._id);
                    }
                  }}
                ></i>
                <i
                  class="red right close link icon"
                  onClick={() => {
                    setAyudaId(tile._id);
                    console.log(tile._id);
                    setOpenAlert(true);
                  }}
                ></i>
              </div>
              <div class="ui tiny image">
                <img
                  src={`${apiUrlImages}/${tile.imagen_icon}`}
                  alt={`${apiUrlImages}/${tile.imagen_icon}`}
                />
              </div>
              <div class="middle aligned content">
                <div class="header">
                  {/* <input
                    className={classes.inputCustom}
                    disabled={!isEditModeEnable}
                    value={tile.titulo}
                  /> */}
                  {tile.titulo}
                </div>
                <div class="description">{tile.descripcion}</div>
              </div>
            </div>
          ))}
        </div>
      </GridList>
    </div>
  );
}
