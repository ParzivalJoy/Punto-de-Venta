import React from "react";
import useBubbletownApi from "../../../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiUrl, apiUrlImages } from "../../../shared/constants";

export default function PremioCard(props) {
  const { data: tile, loading } = useBubbletownApi({
    path: `premio/${props.premioId}`,
  });

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <div class="ui two cards" style={{ width: "340px" }}>
      <p></p>
      <div class="card" style={{ marginRight: 0, paddingRight: 0 }}>
        <div class="image">
          <img
            src={`${apiUrlImages}/${tile.imagen_icon}`}
            alt={`${apiUrlImages}/${tile.imagen_icon}`}
          />
        </div>
        <div class="content">
          <div class="header">{tile.titulo}</div>
          <div class="meta">
            <a>Id:{tile._id}</a>
          </div>
          <div class="description">
            Vigencia: {parseISOString(tile.fecha_vigencia)}
          </div>
        </div>
        <div class="extra content">
          <span class="right floated">Creado el {tile.fecha_creacion}</span>
          <span>
            <i class="bullseye icon"></i>
            {tile.puntos} Puntos
          </span>
        </div>
      </div>
      <div class="card" style={{ marginLeft: 0, paddingLeft: 0 }}>
        <div class="image">
          <img
            src={`${apiUrlImages}/${tile.imagen_display}`}
            alt={`${apiUrlImages}/${tile.imagen_display}`}
          />
        </div>
      </div>
    </div>
  );
}
