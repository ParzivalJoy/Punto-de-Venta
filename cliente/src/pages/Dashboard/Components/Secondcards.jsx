import React, {useEffect, useState} from 'react'
import '../../../styles.scss';
import axios from 'axios'
import PacmanLoader from "react-spinners/PacmanLoader";
import {Doughnut, Bar, PolarArea} from 'react-chartjs-2'

export default function Secondcards() {

    const [ingredientNot, setIngredientNot] = useState('')
    const [totalingredients, setTotalIngredients] = useState('')
    const [nombrecomplemento, setNombreComplemento] = useState([])
    const [name, setName] = useState([])

    const [loading, setLoading]=useState(true)

    async function getSalesComplement(){
        const {data} = await axios.get('http://localhost:5000/api/dashboard/complement')
        setName(data)
        console.log(name)
    }

    async function getIngredientNot(){
        const {data} = await axios.get('http://localhost:5000/api/dashboard/ingredientnot')
        setIngredientNot(data.count)
    }

    async function getTotalIngredients(){
        const {data} = await axios.get('http://localhost:5000/api/dashboard/ingredient')
        setTotalIngredients(data.count)
    }


    useEffect(() =>{
        getIngredientNot()
        getTotalIngredients()
        getSalesComplement()
    }, [])

    const dataGraph1={
        labels: ['Ingredientes bajos de inventario','Ingredientes estandar'],
        datasets:[{
            label: "Inventario de ingredientes",
            data: [ingredientNot,totalingredients-ingredientNot],
        }]
    }

    if(name === []){
        setLoading(false)
    }

    console.log(name)
    var dataGraph2 = {}
    if(name !== []){
        name.map(item =>(
        dataGraph2={
            labels: [item.nombrecomplemento],
            datasets:[{
                label: "Complementos más vendidos",
                data: [item.idcomplemento]
            }]
            }
        ))
    }

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
                position: 'top'
            },
            title: {
                display: true,
                text: 'Inventario de ingredientes',
                position: 'left'
            }
        }
    }

    return (
        <div>
            {name !== null && name !== [] ? (
            <div className="dash-cards">
            <div className="card second-graph">
                <Bar data={dataGraph1} options={opciones} />
                <Bar data={dataGraph1} options={opciones} />
            </div>
            <div className="card second-graph">
                <div className="second-card-item">
                    <Doughnut data={data} options={opciones} />
                </div>
            </div>
        </div>
        ) : (<div className="d-flex justify-content-center align-items-center" id="cargascreen">
        <div>
            <PacmanLoader size={30} color={"#123adc"} loading={loading}  />
        </div>
      </div>
   )}
        </div>
    )
}
