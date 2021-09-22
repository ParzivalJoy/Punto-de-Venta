import React from 'react'
import '../../../styles.scss';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import StoreIcon from '@material-ui/icons/Store';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function cards() {
    return (
        <div className="dash-cards">
            <div className="card-item">
                <span className="card-title">Ventas</span>
                <div className="card-money">
                    <StoreIcon className="icons"/>
                    <span className="card-money-title">$1,000</span>
                    <span className="card-money-sub">+15<TrendingUpIcon className="uparrow"/> </span> 
                </div>
                <span className="card-p">Ver detalles</span>
            </div>    
            <div className="card-item">
                <span className="card-title">Alertas de productos</span>
                <div className="card-money">
                    <NotificationsIcon className="icons"/>
                    <span className="card-money-title">50</span>
                    <span className="card-money-sub">-5<TrendingDownIcon className="downarrow"/> </span> 
                </div>
                <span className="card-p">Ver detalles</span>
            </div>
            <div className="card-item">
                <span className="card-title">Clientes afiliados</span>
                <div className="card-money">
                    <PersonAddIcon className="icons"/>
                    <span className="card-money-title">60</span>
                    <span className="card-money-sub">+10<TrendingUpIcon className="uparrow"/> </span> 
                </div>
                <span className="card-p">Ver detalles</span>
            </div>
        </div>
    )
}
