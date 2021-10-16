import React from "react";
import * as BiIcons from "react-icons/bi";
//import "./Inventarios.css";
import {Link} from 'react-router-dom';

function MenuPosterior() {

  return (
    <div className="container px-4">
      <div className="row g-3 my-2 justify-content-center">
        <div className="col-sm-2 mx-2" id="tarjeta">
          <div className="p-2 shadow d-flex justify-content-around align-items-center-rounded thover text-center">
            <div>
              <Link to="./AgregarInventario">
                <BiIcons.BiMessageAltAdd size="6vw" />
                <p className="mtext">Agregar inventario</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-2 mx-2" id="tarjeta">
          <div className="p-2 thover shadow d-flex justify-content-around align-items-center-rounded text-center">
            <div>
              <Link to="/ReporteMerma">
                <BiIcons.BiNotepad size="6vw" />
                <p className="mtext"> Reporte de merma</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-2 mx-2" id="tarjeta">
          <div className="p-2 thover shadow d-flex justify-content-around align-items-center-rounded text-center">
            <div>
              <Link to="/ImportarInv">
                <BiIcons.BiImport size="6vw" />
                <p className="mtext">Importar inventarios</p>
              </Link>
            </div>
          </div>
        </div>
            
        </div>
    </div>
  );
}

export default MenuPosterior;
