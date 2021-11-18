import React from "react";
import useBubbletownApi from "../../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiUrlImages } from "../../shared/constants";
import PremioCard from "./PremioCard";
import EncuestaCard from "./EncuestaCard/index";

export default function PromoCard(props) {
  const { data: tile, loading } = useBubbletownApi({
    path: `/admin/notificaciones/${props.notificacionId}/acciones/ninguna`,
  });

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <>
      <div class="ui link cards" style={{ height: "120px" }}>
        {/* <a class="ui teal ribbon label">Notificación</a> */}
        <div class="card" id={tile.notificacion._id}>
          <div class="content">
            <img
              class="right floated mini ui image"
              src={`${apiUrlImages}/${tile.notificacion.imagenIcon}`}
            />
            {/* <h6>{`${apiUrlImages}/${tile.notificacion.imagenIcon}`} </h6> */}
            <div
              class="header"
              style={{ "max-height": "40px", overflow: "hidden" }}
            >
              {tile.notificacion.titulo || ""}
            </div>
            <div class="meta">
              {(tile.notificacion.fecha &&
                parseISOString(tile.notificacion.fecha)) ||
                ""}
            </div>
            <div
              class="description"
              style={{ "max-height": "15px", overflow: "hidden" }}
            >
              {tile.notificacion.mensaje || ""}
            </div>
            <span
              class="meta right floated"
              style={{ "max-height": "15px", overflow: "hidden" }}
            >
              {tile.notificacion.bar_text || ""}
            </span>
          </div>
        </div>
      </div>
      {tile.notificacion.tipo_notificacion == "premio" &&
        tile.notificacion.link &&
        tile.notificacion.link !== "null" && (
          <PremioCard premioId={tile.notificacion.link} />
        )}
      {tile.notificacion.tipo_notificacion == "encuesta" &&
        tile.notificacion.link &&
        tile.notificacion.link !== "null" && (
          <EncuestaCard encuestaId={tile.notificacion.link} />
        )}
    </>
  );
}
