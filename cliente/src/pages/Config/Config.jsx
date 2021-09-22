import React  from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function Config() {
    return (
        <div className="configuration">
            <div className="theme-container">
                <div className="row">
                    <div class="col-lg-10">
                        <span className="config-cont-title">Configuración de Temas y Colores</span>
                    </div>
                    <div class="col-sm-2">
                        <ImageSearchIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}
