import React from 'react'
import "../../styles.scss"
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from 'react-router-dom';

function Sidebar() {
    const user = localStorage.getItem("user")
    const role = localStorage.getItem('role')

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-profile">
                    <div className="sidebar-img">
                    <Link to = '/logout' className="link">
                        <LogoutIcon className="icons profile-icon"/>
                    </Link>
                    </div>
                    <div className="sidebar-info">
                        <span className="sidebar-info-name">{user}</span>
                        <span className="sidebar-info-ocupation">{role}</span>
                    </div>
                     
                </div>

                <div className="sidebarMenu">
                    <ul className="sidebar-list">
                        <li className="sidebar-items active">
                            <Link to = '/dashboard' className= "link">
                                <DashboardIcon className="icons sidebar-icons"/> 
                                <span className="sidebar-pages">Dashboard</span>
                            </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <Link to = '/employees' className= "link">
                                <AssignmentIndIcon className="icons sidebar-icons"/> 
                                <span className="sidebar-pages">Empleados</span>
                            </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <Link to = '/ventas' className= "link">
                                <AttachMoneyIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Ventas</span>
                            </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <Link to = '/inventory' className= "link">  
                                <StorageIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Inventario</span>
                            </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                        <Link to = '/addproduct' className= "link">
                            <FastfoodIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Flujo de venta</span>
                        </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <Link to = "/accounting" className="link">
                                <MoneyOffIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Contabilidad</span>
                            </Link>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <MailOutlineIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Gestor de campañas</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <SettingsIcon className="icons sidebar-icons"/> <span className="sidebar-pages">Configuración</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;
