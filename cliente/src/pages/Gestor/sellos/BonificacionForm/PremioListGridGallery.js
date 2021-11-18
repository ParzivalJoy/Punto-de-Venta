import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { apiUrlImages } from "../../shared/constants";

import useBubbletownApi from "../../helpers/useBubbletownApi";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { data: notificaciones, loading } = useBubbletownApi({
    path: `promociones`
  });

  const parseISOString = s => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <>
      <Grid item xs={6}>
        <TextField
        style={{ width: "320px" }}
          id="outlined-select-premio_sellos"
          select
          label="Seleccionar promoción"
          name="notificaciones"
          // disabled={props.editar}
          value={props.value}
          // onChange={event => {
          //   // setFieldValue("notificaciones.value", event.target.value);
          //   console.log(event);
          //   console.log("valor:",props.value);

          // }}
          helperText="Por favor seleccione algún tipo de promoción del punto de venta. ¿Qué transacción del sistema punto de venta corresponde a este evento, es decir, cómo entiende el PV esta transacción?"
          variant="outlined"
          error={props.error}
          onFocus={props.onFocus}
        >
          {notificaciones.map(tile => (
            <GridListTile key={tile._id} value={tile._id} label={tile._id}>
              <>
                {/* <div class="ui link cards" > */}
                <div class="ui card link" onClick={() => props.handleChange(tile._id)}>
                  <div class="image">
                    <img src={`${apiUrlImages}/${tile.imagen}`} style={{ "max-height": "200px" }} />
                  </div>
                  <div
                    class="content"
                    style={{ "max-height": "170px", overflow: "hidden" }}
                  >
                    <a class="header">{tile.titulo}</a>
                    <div class="meta">
                      <span class="date">
                        Vigencia: {parseISOString(tile.fecha_vigencia_start)} al{" "}
                        {parseISOString(tile.fecha_vigencia_end)}
                      </span>
                    </div>
                    <div class="description">{tile.descripcion}</div>
                  </div>
                  <div class="extra content">
                    <a>
                      <i class="currency icon"></i>
                      Precio de venta: ${tile.precio_venta} pesos
                    </a>
                  </div>
                </div>
                {/* </div> */}
              </>
            </GridListTile>
          ))}
        </TextField>
      </Grid>
    </>
  );
}
