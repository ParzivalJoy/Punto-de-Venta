import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { registry } from 'chart.js'

var labels = []
var datas = []

export default function Graph() {

    async function getGraphData(){
        const {data} = await axios.get('http://localhost:5000/api/dashboard/graphdata')
        data.map(item =>(
            labels.push(item.nombreproducto),
            datas.push(item.count)
        ))
    }

    useEffect(() =>{
        getGraphData()
    }, [])

    const Graphdata={
        labels: labels,
        datasets:[{
            label: 'Productos más vendidos',
            backgroundColor: '#fff',
            color: '#fff',
            data: datas
        }]
    }

    const opciones={
        maintainAspectRadio: false,
        responsive: true
    }

    return (
        <div className="graph">
            <Bar data={Graphdata} options={opciones}/>
        </div>
    )
}
