import React from 'react'
import { Link } from 'react-router-dom'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HelpIcon from '@mui/icons-material/Help';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

export default function Menu() {
    return (
        <div className="p-3 mb-2">
            <div className="row">
                <div className="col-md-6">
                <Link to = "/gestor/notificaciones" className="link">
                    <div className="card card-item">
                    <span className="top-title-card">Notificaciones</span>
                    <div className="card-money">        
                        <NotificationsActiveIcon className="icons"/>
                    </div>
                    </div>
                    </Link>
                </div>
                <div className="col-md-6">
                <Link to = "/gestor/ayuda" className="link">
                    <div className="card card-item">
                    <span className="top-title-card">Ayuda (Q&A)</span>
                    <div className="card-money">        
                        <HelpIcon className="icons"/>
                    </div>
                    </div>
                    </Link>
                </div>
            
                <div className="col-md-6">
                <Link to = "/gestor/sellos" className="link">
                    <div className="card card-item">
                    <span className="top-title-card">Sistema de Sellos</span>
                        <div className="card-money">        
                            <AccountBoxIcon className="icons"/>
                        </div>
                    </div>
                </Link>
                </div>
                <div className="col-md-6">
                <Link to = "/gestor/puntos" className="link">
                    <div className="card card-item">
                    <span className="top-title-card">Sistema de Puntos</span>
                    <div className="card-money">        
                            <VolunteerActivismIcon className="icons"/>
                        </div>
                    </div>
                </Link>
                </div>
                <div className="col-md-12">
                <Link to = "/gestor/catalogo" className="link">
                    <div className="card card-item">
                    <span className="top-title-card">Catalogo</span>
                    <div className="card-money">        
                            <SnippetFolderIcon className="icons"/>
                        </div>
                    </div>
                </Link>
                </div>
            </div>
        </div>
    )
}
