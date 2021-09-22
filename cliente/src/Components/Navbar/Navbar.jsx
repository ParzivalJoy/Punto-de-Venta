import React, {useState, useEffect} from 'react'
import "../../styles.scss"
import "./Components/themes.css"
import StarsIcon from '@mui/icons-material/Stars';



export default function Navbar() {
    console.log ("This is your token", sessionStorage.getItem("token"))


    return (
        <div className='navbar'>
            <div className="navbar-wrapper">
                    <StarsIcon className="nav-icon"/>
                    <span className="logo">Punto de Venta</span>
            </div>
        </div>
    )
}
