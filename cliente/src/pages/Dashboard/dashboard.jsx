import React from 'react'
import Cards from './Components/cards'
import Chart from './Components/chart'
import '../../styles.scss';
import {userdata} from "./Components/chart-data"
import LeftTable from "./Components/lefttable"
import RightTable from "./Components/righttable"

export default function dashboard() {
    return (
        <div className="dashboard">
            <Cards/>
            <Chart data={userdata} title="Gráfica de Ventas (Primer semestre)" grid dataKey="sales"/>
            <div className="dash-tables">
                <LeftTable/>
                <RightTable/>
            </div>
        </div>
    )
}
