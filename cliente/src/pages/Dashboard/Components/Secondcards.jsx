import React, {useEffect, useState} from 'react'
import '../../../styles.scss';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import StoreIcon from '@material-ui/icons/Store';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios'
import {Doughnut, Bar, PolarArea} from 'react-chartjs-2'

export default function Secondcards() {

    const [ingredientNot, setIngredientNot] = useState('')

    async function getIngredientNot(){
        const {data} = await axios.get('http://localhost:5000/api/dashboard/ingredientnot')
        setIngredientNot(data.count)
    }

    useEffect(() =>{
        getIngredientNot()
    }, [])

    const data={
        labels: ['Producto','Ingrediente','Cosa'],
        datasets:[{
            data: [50,20,70],
        }]
    }

    const opciones={
        maintainAspectRadio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'left'
            }
        }
    }

    return (
        <div>
            <div className="dash-cards">
            <div className="card card-item-graph">
            <div className="second-card-item">
                <PolarArea data={data} options={opciones} />
            </div>    
            </div>
            <div className="card card-item-graph">
                <div className="second-card-item">
                    <Doughnut data={data} options={opciones} />
                </div>
            </div>
            <div className="card card-item-graph">
                <div className="second-card-item">
                    <Doughnut data={data} options={opciones} />
                </div>
            </div>
        </div>
        </div>
    )
}
