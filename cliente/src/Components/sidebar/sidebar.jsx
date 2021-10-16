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
import { useHistory } from "react-router-dom";

function Sidebar() {
    const user = localStorage.getItem("user")
    const role = localStorage.getItem('role')

    let history = useHistory();

    function logoutapp()
    {
        localStorage.removeItem("user")
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        history.push("/login");
    }

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-profile">
                    <div className="sidebar-img">
                        <AccountCircleIcon className="profile-icon"/>
                    </div>
                    <div className="sidebar-info">
                        <span className="sidebar-info-name">{user}</span>
                        <span className="sidebar-info-ocupation">{role}</span>
                    </div>
                    <button onClick={logoutapp}><LogoutIcon className="icon-logout"/></button>
                </div>

                <div className="sidebarMenu">
                    <ul className="sidebar-list">
                        <li className="sidebar-items active">
                            <DashboardIcon className="sidebar-icons"/> <span className="sidebar-pages">Dashboard</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <AssignmentIndIcon className="sidebar-icons"/> <span className="sidebar-pages">Empleados</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <AttachMoneyIcon className="sidebar-icons"/> <span className="sidebar-pages">Ventas</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <StorageIcon className="sidebar-icons"/> <span className="sidebar-pages">Inventario</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <FastfoodIcon className="sidebar-icons"/> <span className="sidebar-pages">Flujo de venta</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <MoneyOffIcon className="sidebar-icons"/> <span className="sidebar-pages">Contabilidad</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <MailOutlineIcon className="sidebar-icons"/> <span className="sidebar-pages">Gestor de campañas</span>
                        </li>
                        <hr/>
                        <li className="sidebar-items">
                            <SettingsIcon className="sidebar-icons"/> <span className="sidebar-pages">Configuración</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;
