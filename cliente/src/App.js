import React from 'react';
import Dashboard from './pages/Dashboard/dashboard';
import Inventory from './pages/Inventory/MenuPosterior'
import Form from './pages/Login/Components/Form';
import Employees from './pages/Employees/Employees';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Configuracion from './pages/Config/Config'
import Sales from './pages/Sales/Sales';
import { ProtectedRoute } from './ProtectedRoute';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path ="/login"><Form/></Route>   
          <ProtectedRoute exact path = "/dashboard" component={Dashboard}/>
          <ProtectedRoute exact path ="/employees" component={Employees}/>
          <ProtectedRoute exact path ="/configuration" component={Configuracion}/>
          <ProtectedRoute exact path ="/sales" component={Sales}/>
          <ProtectedRoute exact path = "/inventory" component={Inventory}/>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
