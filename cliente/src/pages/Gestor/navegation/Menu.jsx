import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <div className="p-3 mb-2">
            <div className="row">
                <div className="col-md-4">
                <Link to = "/gestor/notificaciones" className="link">
                    <div className="card card-item">
                    Notificaciones
                    </div>
                    </Link>
                </div>
                <div className="col-md-4">
                <Link to = "/gestor/ayuda" className="link">
                    <div className="card card-item">
                    Ayuda (Q&A)
                    </div>
                    </Link>
                </div>
                <div className="col-md-4">
                    <div className="card card-item">
                        Formularios
                    </div>
                </div>
                <div className="col-md-6">
                <Link to = "/gestor/sellos" className="link">
                    <div className="card card-item">
                        Sistema de Sellos
                    </div>
                </Link>
                </div>
                <div className="col-md-6">
                <Link to = "/gestor/puntos" className="link">
                    <div className="card card-item">
                        Sistema de Puntos
                    </div>
                </Link>
                </div>
                <div className="col-md-12">
                <Link to = "/gestor/catalogo" className="link">
                    <div className="card card-item">
                        Catalogo
                    </div>
                </Link>
                </div>
            </div>
        </div>
    )
}
