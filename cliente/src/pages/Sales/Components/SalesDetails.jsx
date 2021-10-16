import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import FastfoodIcon from '@mui/icons-material/Fastfood';

export default function SalesDetails() {
    const params = useParams();
    const id = params.id


    const [nombreproducto, setnombreproducto] = useState('')
    const [descripcionproducto, setdescripcionproducto] = useState('')
    const [precioproducto, setprecioproducto] = useState('')
    const [unidad, setunidad] = useState('')
    const [imagen, setImagen] = useState('')
    const [cantidadproducto, setcantidad] = useState('')

    const [cart, setCart] = useState([])

    const [listComplementos, setListcomplementos] = useState([])
    const [listModificadores, setListModificadores] = useState([])
    const [listOptions, setListOptions] = useState([])

    useEffect(() =>{
        getProduct()
    }, [])


    async function getProduct(id){
        const {data} = await axios.get('http://localhost:5000/api/products'+`/${params.id}`)
        setnombreproducto(data.nombreproducto)
        setdescripcionproducto(data.descripcionproducto)
        setprecioproducto(data.precioproducto)
        setunidad(data.nombreunidad)
        setcantidad(data.cantidadproducto)
        setImagen(data.encode)
    }

    async function getListComplements(id){
        const {data} = await axios.get('http://localhost:5000/api/complements'+`/${params.id}`)
        setListcomplementos(data)
    }

    async function getListModifiers(id){
        const {data} = await axios.get('http://localhost:5000/api/modifiers'+`/${params.id}`)
        setListModificadores(data)
        console.log(data)
    }

    async function getListOptions(idmodificador){
        const {data} = await axios.get('http://localhost:5000/api/options'+`/${idmodificador}`)
        setListOptions(data)
    }

    function addCart(){
        const data = []
        const data2 = []

        data.push({id: id, nombre: nombreproducto})
        console.log('Primer push:',data)


        
        localStorage["mydatas"] = JSON.stringify(data)
        
        var datas = JSON.parse(localStorage["mydatas"])
        console.log('Localstore:', datas)
        datas.map(item =>(
            data2.push({id: item.id, nombre: item.nombre})
        ))
        console.log('Segundo push:', data2)
        
        
    }
    return (     
        <div className="sales">
            <Header/>
                <div className="sales-body">
                    <div className="sales-catalogue">
                        <div className="card">
                            <div className="card-header product-header">
                                <span>Detalles del producto</span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                        <img src={`data:image/jpeg;base64,${imagen}`} alt="" width="200px" height="200px"/>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card">
                                            <span className="details-name">{nombreproducto}</span>                                        
                                            <span className="details-subtitle">Información</span>
                                            <div className="details-info">
                                            <span className="details-info">Precio $ {precioproducto}</span>
                                            <hr width="1" size="20"/>
                                            <span className="details-info">{cantidadproducto} {unidad}</span> 
                                            </div>
                                            <span className="details-subtitle">Descripción</span>
                                            <span className="details-descrip">{descripcionproducto}</span>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" onMouseOver={getListComplements.bind(this, {id})}>
                                        Complementos
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                        {listComplementos.map(item =>(
                                            <div className="col-sm-4">
                                                <div className="card">
                                                    <span className="details-name">{item.nombrecomplemento}</span>
                                                    <span className="details-price">Precio: ${item.preciocomplemento}</span>
                                                    <span className="details-descrip">{item.descripcioncomplemento}</span>
                                                    
                                                    <button className="btn btn-primary">Agregar</button>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" onClick={getListModifiers.bind(this, {id})}>
                                        Modificadores
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                        {listModificadores.map(item =>(
                                            (item.multiple === true) ?
                                            <div className="card">
                                                <div className="card-header" onClick={getListOptions.bind(this, item.idmodificador)}>
                                                    {item.nombremodificador}
                                                </div>
                                                <div className="card-body">
                                                    <div className="row"> 
                                                        {listOptions.map(op =>(
                                                            (item.obligatorio === true) ? 
                                                            <div className="col-sm-4">
                                                                <div className="card card-obligatory">
                                                                    <span className="modifier-name">{op.nombreopcion}</span>
                                                                    <div className="modifier-radio">
                                                                    <input type="radio"name="modifier"/>Agregar por $ {op.precioopcionmodificador}
                                                                    </div>
                                                                    <span className="modifier-price"></span>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="col-sm-4">
                                                                <div className="card">
                                                                    <span className="details-name">{op.nombreopcion}</span>
                                                                    <span className="details-price">$ {op.precioopcionmodificador}</span>
                                                                    <button className="btn btn-primary">Agregar</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            : (item.obligatorio === true) ? 
                                            <div className="card">
                                                <div className="card-body card-obligatory">
                                                    <div className="modifier-body">
                                                        <div className="modifier">
                                                            {item.nombremodificador}
                                                        </div>
                                                        <div className="input">
                                                            <span className="text-obligatory">*Obligatorio</span>
                                                            <input type="checkbox" checked readonly="readonly"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="modifier-body">
                                                        <div className="modifier">
                                                            {item.nombremodificador}
                                                        </div>
                                                        <div className="input">
                                                            <input type="checkbox" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Notas adicionales
                                    </div>
                                    <div className="card-body">
                                        <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Especificaciones adicionales"></textarea>
                                    </div>
                                    <button className="btn btn-primary" onClick={addCart.bind(this, {id}, {nombreproducto}, {precioproducto})}>Añadir al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
