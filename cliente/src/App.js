import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/sidebar/sidebar'
import Dashboard from './pages/Dashboard/dashboard';
import Form from './pages/Login/Components/Form';
import Employees from './pages/Employees/Employees';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Configuracion from './pages/Config/Config'
import Sales from './pages/Sales/Sales';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path ="/login"><Form/></Route>   
          <Route exact path = "/dashboard">
            <Navbar/>
              <div className="sidebar-container">
              <Sidebar/>
              <div className="principal-page">
                <Dashboard/>
              </div>
            </div>
          </Route>
          <Route exact path ="/employees">
          <Navbar/>
              <div className="sidebar-container">
              <Sidebar/>
              <div className="principal-page">
                <Employees/>
              </div>
            </div>
          </Route>
          <Route exact path ="/configuration">
          <Navbar/>
              <div className="sidebar-container">
              <Sidebar/>
              <div className="principal-page">
                <Configuracion/>
              </div>
            </div>
          </Route>
          <Route exact path ="/sales">
          <Navbar/>
              <div className="sidebar-container">
              <Sidebar/>
              <div className="principal-page">
                <Sales/>
              </div>
            </div>
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
