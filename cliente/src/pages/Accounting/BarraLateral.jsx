import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRedo} from '@fortawesome/free-solid-svg-icons'
//import './Contabilidad.css'

function BarraLateral() {

  const [ultimocierre, setUltimocierre]= useState('desconocido')
  const [ultimoencargado,setUltimoencargado]= useState('desconocido')
  const [cuenta, setCuenta]= useState('desconocido')
  const [encargadoactual, setEncargadoactual]= useState('desconocido')
  const [fechaactual, setFechaactual]= useState('desconocido')
  const [ventasefectivo, setVentasefectivo]= useState('desconocido')
  const [ventastarjetas, setVentastarjetas]= useState('desconocido')
  const [ventasvales, setVentasvales]= useState('desconocido')
  const [cajacobrado, setCajacobrado]= useState('no hay cierres por hoy')
  const [cajaretiros, setCajaretiros]= useState('no hay cierres por hoy')
  const [cajacambios, setCajacambios]=useState('no han habido cambios hoy')
  const [totalsistema, setTotalsistema]= useState('desconocido')

  const handleUltimoActualCierre=async ()=>{

    const res = await fetch(
      `http://localhost:5000/contabilidad/DatosUltimoCierre`
    );
    const data = await res.json();
    if(data===null){
      setUltimocierre('primero haga un cierre')
      setUltimoencargado('primero haga un cierre')
    }else{
      setUltimocierre(data.fechacorte)
      setUltimoencargado(data.usuario)
    }

    const tiempotranscurrido= Date.now();
    const hoy= new Date(tiempotranscurrido);
    setFechaactual(hoy.toDateString());
    setEncargadoactual('quiensabe');
    
    const res2 = await fetch(
      `http://localhost:5000/contabilidad/ultimoApertura`
    );
    const data2 = await res2.json();
    const fechaultimoApertura= data2.fechaapertura;
    let vt=0;
    let ve=0;
    let vv=0;
    const res3 = await fetch(
      `http://localhost:5000/contabilidad/VentasHastaAhora/${fechaultimoApertura}`
    );
    const data3 = await res3.json();
    if(data3.sum===null){
        setVentasefectivo(0);
        ve=0
    }else{
        setVentasefectivo(data3.sum);
        ve=data3.sum;
    }
    /////Obtener ventas de tarjetas desde el apertura
    const res4 = await fetch(
      `http://localhost:5000/contabilidad/VentasHastaAhoraTarjetas/${fechaultimoApertura}`
    );
    const data4 = await res4.json();
    if(data4.sum===null){
        setVentastarjetas(0);
        vt=0;
    }else{
        setVentastarjetas(data4.sum);
        vt=data4.sum
    }
    //////////Obtener ventas de vales desde el apertura
    const res5 = await fetch(
      `http://localhost:5000/contabilidad/VentasHastaAhoraVales/${fechaultimoApertura}`
    );
    const data5 = await res5.json();
    if(data5.sum===null){
        setVentasvales(0);
        vv=0;
    }else{
        setVentasvales(data5.sum);
        vv=data5.sum;
    }
    setTotalsistema(parseFloat(vt)+parseFloat(ve)+parseFloat(vv))
    //////////Obtener los gastos desde el apertura
    const res6 = await fetch(
      `http://localhost:5000/contabilidad/GastosCaja/${fechaultimoApertura}`
    );
    const data6 = await res6.json();
    if(data6.sum===null){
        setCajaretiros(0);
    }else{
        setCajaretiros(data6.sum);
    }
    ///////Obtener los cambios ingresados desde apertura
    const res7 = await fetch(
      `http://localhost:5000/contabilidad/CambiosCaja/${fechaultimoApertura}`
    );
    const data7 = await res7.json();
    if(data7.sum===null){
        setCajacambios(0);
    }else{
        setCajacambios(data7.sum);
    }
    ///////Suma de parciales hasta el momento
    const res8 = await fetch(
      `http://localhost:5000/contabilidad/sumaParciales/${fechaultimoApertura}`
    );
    const data8 = await res8.json();
    if(data8.sum===null){
        setCajacobrado('no hay parciales hasta ahora');
    }else{
        setCajacobrado(data8.sum);
    }

  }

  useEffect(() => {
    handleUltimoActualCierre()
  }, [])

    return (
      <div className="row">
        <div className="d-flex justify-content-center">
             <button onClick={handleUltimoActualCierre}><FontAwesomeIcon icon={faRedo} id="icons" />Actualizar Resumen</button>
        </div>
        <div className="col-12 p-1">
          <h3>Resumen de caja</h3>
        </div>

        <div className="col-12 p-1 d-flex justify-content-center">
          <h5>Cuenta: {cuenta}</h5>
        </div>

        <div className="col-12 m-1 ">
          <div className="d-flex justify-content-center justify-content-md-start">
            <h5>Datos de última sesión:</h5>
          </div>
          <div className="p-2">
            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Ultimo cierre de caja: {ultimocierre}</p>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Responsable: {ultimoencargado}</p>
            </div>
          </div>
        </div>

        <div className="col-12 m-1">
          <div className="d-flex justify-content-center justify-content-md-start">
            <h5>Datos de sesión actual:</h5>
          </div>

          <div className="p-2">
            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Fecha: {fechaactual}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Responsable: {encargadoactual}</p>
            </div>
          </div>
        </div>

        <div className="col-12 m-1">
          <div className="d-flex justify-content-center justify-content-md-start">
            <h5>Total venta: ${totalsistema}</h5>
          </div>

          <div className="p-2">
            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Efectivo: ${ventasefectivo}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Tarjeta: ${ventastarjetas}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Vales: ${ventasvales}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Gastos de caja: ${cajaretiros}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Cambios agregados: ${cajacambios}</p>
            </div>
          </div>
        </div>

        <div className="col-12 m-1">
          <div className="d-flex justify-content-center justify-content-md-start">
            <h5>Total en caja hasta el momento:</h5>
          </div>

          <div className="p-2">
            <div className="d-flex justify-content-center justify-content-md-start">
              <p>Suma de parciales: ${cajacobrado}</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default BarraLateral
