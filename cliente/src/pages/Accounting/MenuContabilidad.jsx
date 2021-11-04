import React from 'react'
import "./Contabilidad.css";
import ModalRetiros from './ModalRetiros';
import ModalCambio from './ModalCambio';
import ModalObservaciones from './ModalObsevaciones';
import Parcial from './Parcial';

function MenuContabilidad() {


    return (
      <div className="container">
        <div className="row g-3 my-2 justify-content-center">
          <div className="mx-0" id="tarjeta">
            <div className="p-2 shadow d-flex justify-content-around align-items-center-rounded thover text-center">
              <ModalRetiros />
            </div>
          </div>
          <div className="mx-0" id="tarjeta">
            <div className="p-2 thover shadow d-flex justify-content-around align-items-center-rounded text-center">
              <ModalCambio />
            </div>
          </div>

          <div className="mx-0" id="tarjeta">
            <div className="p-2 thover shadow d-flex justify-content-around align-items-center-rounded text-center">
              <ModalObservaciones />
            </div>
          </div>

          <div className="mx-0" id="tarjeta">
            <div className="p-2 thover shadow d-flex justify-content-around align-items-center-rounded text-center">
              <Parcial />
            </div>
          </div>
        </div>
      </div>
    );
}

export default MenuContabilidad
