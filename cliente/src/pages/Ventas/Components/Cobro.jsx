import React, {useState} from 'react'
import Carrito from './Carrito'
import Header from './Header'
import axios from 'axios' //npm i axios

var productdata = []
var complementdata = []
var modifierdata = []
var multipledata = []
var idpago = 0

export default function Cobro() {

    if(localStorage["productdatas"]){
        productdata = JSON.parse(localStorage["productdatas"])
    }
    if(localStorage["complementdatas"]){
        complementdata = JSON.parse(localStorage["complementdatas"])
    }
    if(localStorage["modifierdatas"]){
        modifierdata = JSON.parse(localStorage["modifierdatas"])
    }
    if(localStorage["multipledatas"]){
        multipledata = JSON.parse(localStorage["multipledatas"])
    }

    function getCurrentDate(separator=''){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    function efectivo(){
        idpago = 1
    }

    function Transaccion(){
        //Si hay productos en el carrito
        if (Object.entries(productdata).length !== 0){
            productdata.map(item =>(
                updateProduct(item.idproducto)
            ))
            addSale()
        }
    }

    async function updateProduct(idproducto){
        const { data } = await axios.put('http://localhost:5000/api/sales/updateproduct'+`/${idproducto}`)
    }

    async function updateComplement(){

    }
    async function updateModifier(){

    }

    async function addSale(){
        let fecha=getCurrentDate()
        let idusuario = localStorage.getItem('userid')
        let totalventa = localStorage.getItem('Totalpagar')
        let descuento = 0

        const obj = { fecha, totalventa, idpago, descuento, idusuario}
        const { data } = await axios.post('http://localhost:5000/api/sales/venta', obj)

    }

    const Total = localStorage.getItem('Totalpagar')

    const [recibido, setRecibido] = useState('')
    console.log(Total)

    const cambio = Total - recibido

    return (
        <div className="cobro">
            <Header/>
            <div className="row">
                <div className="col-7">
                    <div className="card pago">
                        <div className="title">
                            Selecciona el método de pago
                        </div>
                        <div className="options">
                            <button className="btn btn-primary btn-cobro" onClick={efectivo.bind(this)}>Efectivo</button>
                            <button className="btn btn-primary btn-cobro">Transaccion</button>
                            <button className="btn btn-primary btn-cobro">Tarjeta</button>
                        </div>
                        <div className="efectivo">
                            Total a pagar:
                            <input type="text" value={Total} disabled/>
                            Recibido:
                            <input type="text" onChange={ e=> setRecibido(e.target.value)}/>
                            <button className="btn btn-primary btn-cobro" onClick={Transaccion.bind(this)}>Aceptar</button>
                            Su cambio es:
                            <input type="text" value={cambio} disabled/>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <Carrito/>
                </div>
            </div>
        </div>
    )
}
