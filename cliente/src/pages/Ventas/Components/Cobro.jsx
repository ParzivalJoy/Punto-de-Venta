import React, {useState} from 'react'
import Carrito from './Carrito'
import Header from './Header'
import axios from 'axios' //npm i 
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

var productdata = []
var complementdata = []
var modifierdata = []
var multipledata = []
var idpago = 0

export default function Cobro() {

    let history = useHistory();

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

    function getCurrentDate(){
        let today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return `${date}`
    }
    
    function getCurrentHour(){
        let today = new Date()
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return `${time}`
    }

    function efectivo(){
        idpago = 1
    }

    async function Transaccion(){
        let idusuario = localStorage.getItem('userid')
        //Se agrega la venta como ticket de compra
            addSale()
        //Si hay productos en el carrito
        if (Object.entries(productdata).length !== 0){
            productdata.map(item =>(
                updateProduct(idusuario, item.idproducto, item.cantidad, item.precioproducto, item.nombreproducto, item.nota, item.total)
            ))
            //Si hay complementos en el carrito 
            if (Object.entries(complementdata).length !== 0){
                complementdata.map(item =>(
                    updateComplement(idusuario, item.id, item.cantidad, item.nombre, item.precio, item.total)
                ))
                localStorage.removeItem("complementdatas")
            }

            //Si hay modificadores en el carrito 
            if (Object.entries(multipledata).length !== 0){
                multipledata.map(item =>(
                    updateModifier(idusuario, item.idmod, item.id, item.nombremodificador, item.nombre, item.precio, item.idingrediente, item.porcion)
                ))
                localStorage.removeItem("multipledatas")
            }
            localStorage.removeItem("productdatas")
        }

        Swal.fire({
            icon: 'success',
            title: 'Venta realizada con éxito',
            showConfirmButton: false,
            timer: 500
          })

        history.push("/ventas");  
        window.location.reload(true);

        
    }

    async function updateProduct(idusuario, idproducto, cantidad, precio, nombre, nota, total){
        const obj = {idusuario, idproducto, cantidad, nombre, nota, precio, total}
        //Modificar la cantidad del producto
        await axios.put('http://localhost:5000/api/sales/updateproduct',obj)
        //Agregar detalles de la venta de productos
        await axios.post('http://localhost:5000/api/sales/addsaleproduct', obj)

        //Rescata la porcion de cada ingrediente que utiliza el producto
        const {data} = await axios.get('http://localhost:5000/api/sales/verification/ingredient/portion'+`/${idproducto}`)
        
        //Si el producto tiene ingredientes le quita la cantidad utilizada
        if (data !== undefined){
        data.map(item =>(
            updateingredient(idproducto, item.porcion)
        ))
        }
    }

    async function updateModifier(idusuario, idmod, idop, nombremod, nombreop, precio, idingrediente, porcion){
        //Agregar detalles de la venta de modificadores
        const obj = {idusuario, idmod, idop, nombremod, nombreop, precio, idingrediente, porcion}
        await axios.post('http://localhost:5000/api/sales/addsalemodifier',obj)
        await axios.put('http://localhost:5000/api/sales/modifier/updateingredient',obj)
    }

    async function updateComplement(idusuario, idcomplemento, cantidad, nombre, precio, total){
        //Se obtiene el id del producto original
        const { data } = await axios.get('http://localhost:5000/api/sales/verification/complement'+`/${idcomplemento}`)
        let idproducto = data.idproductooriginal
        const obj = {idproducto, cantidad}
        
        //Modificar la cantidad del producto
        await axios.put('http://localhost:5000/api/sales/updateproduct',obj)
        //Agregar detalles de la venta de complementos
        const objproduct = {idusuario, idcomplemento, cantidad, nombre, precio, total}
        await axios.post('http://localhost:5000/api/sales/addsalecomplement', objproduct)
       
        //Rescata la porcion de cada ingrediente que utiliza el producto
        const {dataportion} = await axios.get('http://localhost:5000/api/sales/verification/ingredient/portion'+`/${idproducto}`)
        
        //Si el complemento tiene ingredientes tambien quita la cantidad utilizada
        if (dataportion !== undefined){
            dataportion.map(item =>(
                updateingredient(idproducto, item.porcion)
            ))
        }

    }


    async function updateingredient(idproducto, porcion){
        console.log(porcion)
        console.log(idproducto)
        const obj = {porcion, idproducto}
        await axios.put('http://localhost:5000/api/sales/updateingredient', obj)
    }


    async function addSale(){
        let fechaventa =getCurrentDate()
        let horaventa = getCurrentHour()
        let idusuario = localStorage.getItem('userid')
        let totalventa = localStorage.getItem('Totalpagar')
        let idcliente = 0

        const obj = { idusuario, idcliente, idpago, totalventa , fechaventa, horaventa}
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
                        <div className="card efectivo">
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
