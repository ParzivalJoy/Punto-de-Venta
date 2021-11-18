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

import useBubbletownApi from "../../helpers/useBubbletownApi";
import { apiUrlImages } from "../../shared/constants";

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
    path: `notificaciones`
  });

  const parseISOString = s => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Selleccione una notificación</ListSubheader>
        </GridListTile> */}
        {notificaciones.map(tile => (
          <GridListTile key={tile._id} value={tile._id}>
            <>
              <div class="ui link cards" style={{"height":"80px"}}>
                <div class="card">
                  <div class="content">
                    <img
                      class="right floated mini ui image"
                      src={`${apiUrlImages}/${tile.imagenIcon}`}
                      alt={`${tile.imagenIcon}`}
                    />
                    <div class="header" style={{"max-height":"40px", "overflow": "hidden"}}>{tile.titulo || ""}</div>
                    <div class="meta">{parseISOString(tile.fecha) || ""}</div>
                    <div class="description"  style={{"max-height":"15px", "overflow": "hidden"}}>{tile.mensaje || ""}</div>
                    <span class="meta right floated"  style={{"max-height":"15px", "overflow": "hidden"}}>
                      {tile.bar_text || ""}
                    </span>
                  </div>
                  <div class="extra content">
                    <div class="ui two buttons">
                      <div class="ui basic green button" onClick={() => props.handleChange(tile._id)}>Seleccionar</div>
                      {/* <div class="ui basic red button">Decline</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
