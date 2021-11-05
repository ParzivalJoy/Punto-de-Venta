import React from 'react'
//import "./Contabilidad.css";
import ModalRetiros from './ModalRetiros';
import ModalCambio from './ModalCambio';
import ModalObservaciones from './ModalObservaciones';
import Parcial from './Parcial';
import '../../styles.scss'


function MenuContabilidad() {
    return (
      <div className="dash-cards">
            <ModalRetiros/>
            <ModalCambio/>
            <ModalObservaciones/>
            <Parcial/>
      </div>  
    );
}

export default MenuContabilidad
