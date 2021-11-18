import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";

import NivelCard from "./NivelCard";
import PromoCard from "../birthdays/PromoCard";
import NotificacionCard from "../birthdays/NotificacionCard";
import useBubbletownApi from "../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
    // minWidth: 100,
    // maxWidth: 150,
  },
  gridList: {
    height: 300,
    width: 800,
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    marginBottom: "800px"
  },
  tile: {
    height: 950,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const { data: niveles, loading } = useBubbletownApi({
    path: `niveles`,
  });

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <Grid item xs={12}>
      <GridList className={classes.gridList} cols={2} >
        {niveles.map((tile) => (
          <Grid item xs={12}>
          <GridListTile 
            className={tile}
            key={tile._id}
            value={tile._id}
            label={tile._id}
          >
              <NivelCard
                _id={tile._id}
                num_puntos={tile.num_puntos}
                fecha_creacion={tile.fecha_creacion}
                // dias_vigencia={tile.dias_vigencia}
                fecha_vencimiento={tile.fecha_vencimiento}
                id_promocion={tile.id_promocion}
                id_notificacion={tile.id_notificacion}
                // max_canjeos={tile.max_canjeos}
              />
              <PromoCard promoId={tile.id_promocion} />
              <NotificacionCard notificacionId={tile.id_notificacion} style={{'width': 430}}/>
              <div style={{height: "80px"}}></div>
          </GridListTile>
          </Grid>
        ))}
      </GridList>
    </Grid>
  );
}
