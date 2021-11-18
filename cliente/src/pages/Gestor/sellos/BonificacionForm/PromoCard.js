import React from "react";
import useBubbletownApi from "../../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiUrlImages } from "../../shared/constants";

export default function PromoCard(props) {
  const { data: tile, loading } = useBubbletownApi({
    path: `promociones/${props.promoId}`,
  });

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <div class="ui card link">
      <div class="image">
        <img src={`${apiUrlImages}/${tile.imagen}`}  style={{ "max-height": "200px" }} alt={`${apiUrlImages}/${tile.imagen}`}/>
      </div>
      <div>
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
  );
}
