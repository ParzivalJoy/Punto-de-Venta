import React, {useState, useEffect} from 'react'
import MenuContabilidad from './MenuContabilidad'
import BarraLateral from './BarraLateral'
import CierreCaja from './CierreCaja'
import { Link } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Accounting() {

    const huboapertura = localStorage.getItem("huboapertura")
    const [loading, setLoading]=useState(true)

    console.log(huboapertura)
    return (
        <div>
            
        </div>
    )
}
