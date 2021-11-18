import React from "react";
import useBubbletownApi from "../../../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiUrl, apiUrlImages } from "../../../shared/constants";

export default function EncuestaCard(props) {
  const { data: tile, loading } = useBubbletownApi({
    path: `encuesta/${props.encuestaId}`,
  });

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <div class="ui cards" style={{ width: "340px" }}>
      <div class="card">
        {/* <a class="ui blue ribbon label">Encuesta</a> */}
        <div class="content">
          <div class="header">{tile.titulo}</div>
          <p>Categoría: {tile.categoria}</p>
          <p>Métrica: {tile.metrica}</p>
          <p>Puntos: {tile.puntos}</p>
        </div>
        <div class="extra content">
          {/* <div class="sub header">Páginas</div> */}
          <div class="ui feed">
            {tile.paginas.map((pregunta, index) => (
              <div class="event">
                <div class="content">
                  <div class="summary">
                    Pregunta {index + 1}: {pregunta.titulo}
                    <div class="date">{pregunta.metrica}</div>
                  </div>
                  {pregunta.tipo == "emoji" && (
                    <>
                      <div class="meta">
                        <a class="like" style={{ textDecoration: "none" }}>
                          <i class="folder open icon"></i> Emoji
                        </a>
                      </div>
                      <div class="extra text">
                        <div class="extra images">
                          {pregunta.opciones.map((opc) => (
                            <a>
                              <img
                                src={`${apiUrlImages}/${opc.icon}`}
                                alt={`${opc.icon}`}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {pregunta.tipo == "opcion multiple" && (
                    <>
                      <div class="meta">
                        <a class="like" style={{ textDecoration: "none" }}>
                          <i class="folder open icon"></i> {pregunta.tipo}
                        </a>
                      </div>
                      <div class="extra text">
                        {pregunta.opciones.map((opc, index) => (
                          <div class="extra text">
                            Opción {index + 1}: {opc.calificacion}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {pregunta.tipo == "abierta" && (
                    <div class="meta">
                      <a class="like" style={{ textDecoration: "none" }}>
                        <i class="folder open icon"></i> {pregunta.tipo}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// // SAMPLE template

// <div class="ui cards" style={{ width: "340px" }}>
//       <div class="card">
//         {/* <a class="ui blue ribbon label">Encuesta</a> */}
//         <div class="content">
//           <div class="header">Encuesta de bienvenida Demo</div>
//           <p>Categoría: Campaña de Agosto para mejorar la satisfacción</p>
//           <p>Métrica: Satisfacción</p>
//           <p>Puntos: 0</p>
//         </div>
//         <div class="extra content">
//           {/* <div class="sub header">Páginas</div> */}
//           <div class="ui feed">
//             <div class="event">
//               <div class="content">
//                 <div class="summary">
//                   Pregunta 1: loremasdas asdasda asdas asd aa sda sda s asddssd
//                   asd?
//                   <div class="date">satisfacción general</div>
//                 </div>
//                 <div class="extra text">Opcion 1: Muy Buena</div>
//                 <div class="meta">
//                   <a class="like" style={{ textDecoration: "none" }}>
//                     <i class="folder open icon"></i> Abierta
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div class="event">
//               <div class="content">
//                 <div class="summary">
//                   Pregunta 1: loremasdas asdasda asdas asd aa sda sda s asddssd
//                   asd?
//                   <div class="date">satisfacción general</div>
//                 </div>
//                 <div class="extra text">Opcion 1: Muy Buena</div>
//                 <div class="meta">
//                   <a class="like" style={{ textDecoration: "none" }}>
//                     <i class="folder open icon"></i> Opción múltiple
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div class="event">
//               <div class="content">
//                 <div class="summary">
//                   Pregunta 2: loremasdas asdasda asdas asd aa sda sda s asddssd
//                   asd
//                   <div class="date">satisfacción general</div>
//                 </div>
//                 <div class="meta">
//                   <a class="like" style={{ textDecoration: "none" }}>
//                     <i class="folder open icon"></i> Emoji
//                   </a>
//                 </div>
//                 <div class="extra images">
//                   <a>
//                     <img src="https://source.unsplash.com/random/64x64" />
//                   </a>
//                   <a>
//                     <img src="https://source.unsplash.com/random/64x64" />
//                   </a>
//                   <a>
//                     <img src="https://source.unsplash.com/random/64x64" />
//                   </a>
//                   <a>
//                     <img src="https://source.unsplash.com/random/64x64" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
