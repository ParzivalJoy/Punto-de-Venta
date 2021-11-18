import React from "react";
import {apiUrlImages} from '../shared/constants'

export default function PromoCard(props) {
  const tile = props.producto;
  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  return (
    <div class="ui card">
      <div class="ui right floated">
        <i
          class="red right close link icon"
          onClick={() => {
            props.setProductoId(tile._id);
            props.onDelete(true);
          }}
        ></i>
      </div>
      <div class="ui centered small image">
        <img src={`${apiUrlImages}/${tile.imagen}`} alt={`${apiUrlImages}/${tile.imagen}`}/>
      </div>
      <div
        class="content"
        style={{ "max-height": "170px", overflow: "hidden" }}
      >
        <a class="header">{tile.titulo}</a>
        <div class="meta">
          <span class="date">
            Vigencia: {parseISOString(tile.fecha_vigencia)}
          </span>
        </div>
        <div class="description">{tile.descripcion}</div>
      </div>
      {/* <div class="extra content">
        <a>
          <i class="currency icon"></i>
          Precio de venta: ${tile.precio_venta} pesos
        </a>
      </div> */}
    </div>
  );
}
