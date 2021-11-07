import React from 'react';
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
import AperturaCaja from './pages/Accounting/AperturaCaja'
import FinalizarCierre from './pages/Accounting/FinalizarCierre'
import Accounting from './pages/Accounting/Accounting'
import Cobro from './pages/Ventas/Components/Cobro';

function App() {

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
          <ProtectedRoute exact path="/aperturaCaja" component={AperturaCaja} /> 
          <ProtectedRoute exact path="/reporteCierre" component={FinalizarCierre}/>
          <ProtectedRoute exact path="/accounting" component={Accounting}/>
          <ProtectedRoute exact path="/cobrocarrito" component={Cobro}/>
          <Route exact path ="/logout"><Logout/></Route> 
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
