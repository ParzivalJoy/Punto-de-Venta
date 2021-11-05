import React, {useState, useEffect} from 'react';
import Dashboard from './pages/Dashboard/dashboard';
import Inventory from './pages/Inventory/MenuPosterior'
import Form from './pages/Login/Components/Form';
import Employees from './pages/Employees/Employees';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Configuracion from './pages/Config/Config'
import { ProtectedRoute } from './ProtectedRoute';
import AgregarInventario from './pages/Inventory/AgregarInventario';
import ImportarInv from './pages/Inventory/ImportarInv'
import ReporteMerma from './pages/Inventory/ReporteMerma'
import Logout from './pages/Logout/Components/Form'
import Ventas from './pages/Ventas/Ventas'
import Product from './pages/Ventas/Components/Product';
import './Themes.scss'
import PacmanLoader from "react-spinners/PacmanLoader";
import AperturaCaja from './pages/Accounting/AperturaCaja'
import FinalizarCierre from './pages/Accounting/FinalizarCierre'
import MenuContabilidad from './pages/Accounting/MenuContabilidad'
import BarraLateral from './pages/Accounting/BarraLateral'
import CierreCaja from './pages/Accounting/CierreCaja'
import { Link } from 'react-router-dom';

function App() {

  const [huboapertura,setHuboapertura]=useState('null')
  const [loading, setLoading]=useState(true)

  var tema = 2;
  var color = 1;

    if (tema === 1) {
      document.documentElement.setAttribute("data-theme", "light");
    }else if(tema === 2){
      document.documentElement.setAttribute("data-theme", "dark-blue");
    }else if(tema === 3){
      document.documentElement.setAttribute("data-theme", "dark");
    }else if(tema === 4){
      document.documentElement.setAttribute("data-theme", "purple");
    }else if(tema === 5){
      document.documentElement.setAttribute("data-theme", "red-dark");
    }

    if (color === 1){
      document.documentElement.setAttribute("data-color", "blue");
    }else if (color === 2){
      document.documentElement.setAttribute("data-color", "red");
    }else if (color === 3){
      document.documentElement.setAttribute("data-color", "cyan");
    }else if (color === 4){
      document.documentElement.setAttribute("data-color", "green");
    }

    const handleShowContabilidad= async()=>{
      const res = await fetch(
        `http://localhost:5000/contabilidad/DatosUltimoCierre`
      );
      const data = await res.json();
      if(data===null){
        setHuboapertura('false')
        setLoading(false)
      }else{
        const fcorte= data.fechacorte;
        const fapertura=data.fechaapertura;
        if(fcorte===fapertura){
          setHuboapertura('false')
          setLoading(false)
        }else{
          setHuboapertura('true')
          setLoading(false)
        }
      }
    }

    useEffect(() => {
      handleShowContabilidad()
    }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path ="/login"><Form/></Route>   
          <ProtectedRoute exact path = "/dashboard" component={Dashboard}/>
          <ProtectedRoute exact path ="/employees" component={Employees}/>
          <ProtectedRoute exact path ="/configuration" component={Configuracion}/>
          <ProtectedRoute exact path ="/inventory" component={Inventory}/>
          <ProtectedRoute exact path = "/inventory/add" component={AgregarInventario} />
          <ProtectedRoute exact path = "/inventory/import" component= {ImportarInv} />
          <ProtectedRoute exact path = "/inventory/report" component={ReporteMerma} />
          <ProtectedRoute exact path = "/ventas" component={Ventas} />
          <ProtectedRoute exact path = "/product/:id" component={Product} />
          <ProtectedRoute exact path="/AperturaCaja" component={AperturaCaja} /> 
          <ProtectedRoute exact path="/ReporteCierre" component={FinalizarCierre}/>
          <Route exact path="/accounting">
            {huboapertura === 'true' ? (
              <div className="container">
                <MenuContabilidad />
                <div className="row my-2">
                  <div
                    className="card col-md-3 rounded-3 p-2 m-3"
                    id="colors"
                  >
                    <BarraLateral />
                  </div>
                  <div
                    className="card col-md-8 rounded-3 p-2 mx-2 my-3"
                    id="colors"
                  >
                    <CierreCaja />
                  </div>
                </div>
              </div>
            ) : huboapertura==='false' ? (
              <div className="container">
                <div className="d-flex justify-content-center" id="colors">
                  <h1>Primero haz el apertura de caja</h1>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-center m-3">
                    <Link to="/AperturaCaja">
                          <button className="p-2">Hacer apertura de caja</button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (<div className="d-flex justify-content-center align-items-center" id="cargascreen">
                  <div>
                      <PacmanLoader size={30} color={"#123adc"} loading={loading}  />
                  </div>
                </div>
             )}
          </Route>
          <Route exact path ="/logout"><Logout/></Route> 
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
