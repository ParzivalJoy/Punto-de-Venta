import React, {useState, useEffect} from 'react'

export default function Cuentas() {

    const [activocuentas, setActivoCuenta] = useState(false)

    return (
        <div className="row d-flex justify-content-center">
        <div className="card col-md-11 m-4">
          <h3 className="config-title" onClick={() => setActivoCuenta(!activocuentas)}>
            {activocuentas === true
              ? "- Click para cerrar esta sección"
              : "+ Click aquí para definir los datos de la cuenta del negocio"}
          </h3>
          {activocuentas === true ? (
            <div className="row">
                <div className="col-md-6">
                    <span>Datos de la cuenta del negocio</span>
                    <label>Ingresa el número de cuenta:</label>
                    <input type="text" placehold></input>
                </div>
                <div className="col-md-6">
                    Datos de Mercado Pago
                    
                </div>
            </div>
          ) : (
            <div>
              <p>Aqui puedes escoger el tema que desees para el POS!</p>
            </div>
          )}
        </div>
      </div>
    )
}
