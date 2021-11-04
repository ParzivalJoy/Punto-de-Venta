import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from './Header'
import SearchIcon from '@mui/icons-material/Search'
import imagen from '../../../assets/sin-imagen.jpg'
import axios from 'axios'
import Carrito from './Carrito'
import { useHistory } from "react-router-dom";

    const dataModifier = []
    const dataMultiple = []
    const dataComplement = []
    const data = []

export default function Product() {

    let history = useHistory();
    const params = useParams();
    const id = params.id

    const [productName, setProductName] = useState('')
    const [productDescr, setProductDescr] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const [complementlist, setComplementList] = useState([])
    const [modifierlist, setModifierList] = useState([])
    const [optionlist, setOptionList] = useState([])

    async function getProduct(id){
        const {data} = await axios.get('http://localhost:5000/api/products'+`/${params.id}`)
        setProductName(data.nombreproducto)
        setProductDescr(data.descripcionproducto)
        setProductPrice(data.precioproducto)

    }

    async function getListComplements(id){
        const {data} = await axios.get('http://localhost:5000/api/complements'+`/${params.id}`)
        setComplementList(data)
    }

    async function getListModifiers(id){
        const {data} = await axios.get('http://localhost:5000/api/modifiers'+`/${params.id}`)
        setModifierList(data)
    }

    async function getListOptions(idmodificador){
        const {data} = await axios.get('http://localhost:5000/api/options'+`/${idmodificador}`)
        setOptionList(data)
        console.log(dataMultiple)
    } 

    const selectedRadio = (e, idmod, id, name, price) => {
        var length = ''
        length = dataMultiple.filter(p => p.idmod == idmod).length 

        if (length === 0){
            dataMultiple.push({idcarrito: '', idproducto: params.id, idmod: idmod, id: id, nombre: name, precio: price})
        }else{
            var index = dataMultiple.findIndex((obj => obj.idmod == idmod))
            console.log("Indice:", index)
            if(index >= 0){
                dataMultiple[index].precio = price
                dataMultiple[index].id = id
                dataMultiple[index].nombre = name
                console.log("Elegir otra opcion:", dataMultiple) 
            }else{
                dataMultiple.push({idcarrito: '', idproducto: params.id, idmod: idmod, id: id, nombre: name, precio: price})
            }          
        }
        
    };

    const selectedCheckbox = (e, id, name, price) => {
        const checked = e.target.checked

        if (checked) {
            var length = ''
            length = dataModifier.filter(p => p.id == id).length 
            if (length === 0){
                dataModifier.push({idcarrito: '', idproducto: params.id, id: id, nombre: name, precio:price}) 
            }
            console.log(length)
            console.log(dataModifier)

        } else {
            var length = ''
            length = dataModifier.filter(p => p.id == id).length 

            if (length !== 0){
                var index = dataModifier.findIndex((obj => obj.id == id))
                console.log(id)
                console.log(index)
                dataModifier.splice(index, 1)
            }
            console.log(dataModifier)
        }
       
    };

    const selectedComplement = (e, id, name, price) => {
        const value = e.target.value
        var length = ''

            //Si el valor es diferente de 0
            if (value !== '0'){
                length = dataComplement.filter(p => p.id == id).length 
                //Si no existe en el arreglo se hace un push
                if (length === 0){
                    dataComplement.push({idcarrito: '', idproducto: params.id, id: id, nombre: name, precio: price * value}) 
                //Si existe en el arreglo
                }else{
                    var index = dataComplement.findIndex((obj => obj.id == id))
                    //Encuentra el indice y cambia el precio
                    if(index >= 0){
                        dataComplement[index].precio = price * value
                    }else{
                        dataComplement.push({idcarrito: '', idproducto: params.id, id: id, nombre: name, precio: price * value})
                    }          
                }
          }else{
            var index = dataComplement.findIndex((obj => obj.id == id))
            console.log("Entro")
            if(index >= 0){
                dataComplement.splice(index, 1)
            }
          }
          console.log(dataComplement)
    }
          
    
    function addCart(){

        if(localStorage["productdatas"]){
            //Guarda los datos de localstorage en temp
            var ptemp = JSON.parse(localStorage["productdatas"])
            var length = ''
            length = ptemp.length 
            var carrito = length + 1
            //Push a data con los datos en localstorage
            ptemp.map(item => (
                data.push({idcarrito: item.idcarrito, idproducto: item.idproducto, nombreproducto: item.nombreproducto, precioproducto: item.precioproducto})
            ))

            //Push a data para guardar los valores
            data.push({idcarrito: carrito, idproducto: params.id, nombreproducto: productName, precioproducto: productPrice})
            console.log('Primer push:',data)

            //Se guarda data en localstore mydatas
            localStorage["productdatas"] = JSON.stringify(data)
        }else{
            carrito = 1
            //Push a data para guardar los valores
            data.push({idcarrito: carrito, idproducto: params.id, nombreproducto: productName, precioproducto: productPrice})
            console.log('Push localstore limpio:',data)

            //Se guarda data en localstore mydatas
            localStorage["productdatas"] = JSON.stringify(data)
        }
        console.log(JSON.parse(localStorage["productdatas"]))
        

        if(dataComplement.length !== 0){
            var index = 0
            dataComplement.map(item =>(
                (item.idcarrito === '') ? 
                    item.idcarrito = carrito
                : ''
            ))
            if(localStorage["complementdatas"]){
                //Guarda los datos de localstorage en temp
                var ctemp = JSON.parse(localStorage["complementdatas"])
                var length = ''
                length = ctemp.length                 
                //Push a data con los datos en localstorage
                ctemp.map(item => (
                    dataComplement.push({idcarrito: item.idcarrito, idproducto: item.idproducto, id: item.id, nombre: item.nombre, precio: item.precio})
                ))
                //Se guarda data en localstore mydatas
                localStorage["complementdatas"] = JSON.stringify(dataComplement)
            }else{
                //Se guarda data en localstore mydatas
                localStorage["complementdatas"] = JSON.stringify(dataComplement)
            }
        }

        if(dataModifier.length !== 0){
            var index = 0
            dataModifier.map(item =>(
                (item.idcarrito === '') ? 
                    item.idcarrito = carrito
                : ''
            ))
            if(localStorage["modifierdatas"]){
                //Guarda los datos de localstorage en temp
                var mtemp = JSON.parse(localStorage["modifierdatas"])

                var length = ''
                length = mtemp.length                 
                //Push a data con los datos en localstorage
                mtemp.map(item => (
                    dataModifier.push({idcarrito: item.idcarrito, idproducto: item.idproducto, id: item.id, nombre: item.nombre, precio: item.precio}) 
                ))
                //Se guarda data en localstore mydatas
                localStorage["modifierdatas"] = JSON.stringify(dataModifier)
            }else{
                //Se guarda data en localstore mydatas
                localStorage["modifierdatas"] = JSON.stringify(dataModifier)
            }
        }

        if(dataMultiple.length !== 0){
            var index = 0
            dataMultiple.map(item =>(
                (item.idcarrito === '') ? 
                    item.idcarrito = carrito
                : ''
            ))
            if(localStorage["multipledatas"]){
                //Guarda los datos de localstorage en temp
                var multemp = JSON.parse(localStorage["multipledatas"])

                var length = ''
                length = multemp.length                 
                //Push a data con los datos en localstorage
                multemp.map(item => (
                    dataMultiple.push({idcarrito: item.idcarrito, idproducto: item.idproducto, idmod: item.idmod, id: item.id, nombre: item.nombre, precio: item.precio})
                ))
                //Se guarda data en localstore mydatas
                localStorage["multipledatas"] = JSON.stringify(dataMultiple)
            }else{
                //Se guarda data en localstore mydatas
                localStorage["multipledatas"] = JSON.stringify(dataMultiple)
            }
        }
        history.push("/ventas");  
        window.location.reload(true);
           

    }

    useEffect(() =>{
        getProduct()
        getListComplements()
        getListModifiers()
        
    }, [])

    

    return (
        <div className="product">
            
            <Header/>
            <div className="search-bar">
                <div className="card search-card">
                    <div class="row">  
                        <div class="col-11">
                            <input type="text" placeholder="Buscar" className="search-input" />
                        </div>
                        <div class="col-1"><button className="btn btn-primary"><SearchIcon/></button></div>
                    </div>
                </div> 
            </div>
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <img src={imagen} className="product-image" />
                    </div>
                    <div className="card">
                        <span className="product-name">{productName}</span>
                        <span className="product-descr">{productDescr}</span>
                        <hr/>
                        {(complementlist.length === 0) ? '' : 
                        <div>
                            <span className="product-section">Complementos a elegir:</span>
                            {complementlist.map(item =>(
                            <div className="row">
                                <br/>
                                <div className="col-3">
                                    <span className="product-details-name">{item.nombrecomplemento}</span>
                                </div>
                                <div className="col-5">
                                    <span className="product-descr">{item.descripcioncomplemento}</span>
                                </div>
                                <div className="col-4">
                                    <span className="product-price">+MX ${item.preciocomplemento}</span>
                                    <input type="number" className="product-cant-input" placeholder="0" min="0" max="5" onChange={(e) => {selectedComplement(e, item.idcomplemento, item.nombrecomplemento, item.preciocomplemento);}}/>                
                                </div>
                                <br/><br/>
                            </div>
                        ))}
                        </div>
                        }
                        {(modifierlist.length === 0) ? '' : 
                        <div>
                            {modifierlist.map(item =>(
                                (item.obligatorio === true) ? 
                                    (item.multiple === true) ?
                                    <div>
                                        <div className="row">
                                            <br/>
                                            <div className="col-8">
                                            <span className="product-details-name" onClick={getListOptions.bind(this, item.idmodificador)}>{item.nombremodificador}</span>
                                            </div>
                                            <div className="col-4">
                                            <span className="product-name">Obligatorio</span>
                                            </div>
                                            </div>
                                            {optionlist.map(op =>(
                                                (item.idmodificador === op.idmodificador) ?
                                                <div className="row">
                                                    <div className="col-3"/>
                                                    <div className="col-5">
                                                        {op.nombreopcion}
                                                    </div>
                                                    <div className="col-4">
                                                        +MX $ {op.precioopcionmodificador}
                                                        <button className="btn btn-primary" onClick={(e) => {selectedRadio(e, item.idmodificador, op.idopcionmodificador, op.nombreopcion, op.precioopcionmodificador);}}>Elegir</button>
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                    <hr/>
                                                </div>
                                                : ''
                                            ))}
                                            <hr/>
                                         </div>
                                    :
                                        <div className="row">
                                            <br/>
                                            <div className="col-4">
                                            <span className="product-details-name">{item.nombremodificador}</span>
                                            </div>
                                            <div className="col-4">
                                                <span className="product-obligatory">Obligatorio</span>
                                            </div>
                                            <div className="col-4">
                                                <span className="product-price">+MX ${item.preciomodificador}</span>
                                                <input type="checkbox" className="checkbox disable-team team_values" value="1"
                                                    onClick={(e) => {selectedCheckbox(e, item.idmodificador, item.nombremodificador, item.preciomodificador);}}/>            
                                            </div>
                                            <br/><br/>
                                        </div>
                                :(item.multiple === true) ?
                                <div>
                                        <div className="row">
                                            <br/>
                                            <div className="col-8">
                                            <span className="product-details-name" onMouseOver={getListOptions.bind(this, item.idmodificador)}>{item.nombremodificador}</span>
                                            </div>
                                            <div className="col-4">
                                            <span className="product-details-name">Opcional</span>
                                            </div>
                                            </div>
                                            {optionlist.map(op =>(
                                                <div className="row">
                                                    <div className="col-3"/>
                                                    <div className="col-5">
                                                        {op.nombreopcion}
                                                    </div>
                                                    <div className="col-4">
                                                        +MX $ {op.precioopcionmodificador}
                                                        <input type="radio" name="modifier" className="product-radio" onChange={(e) => {selectedRadio(e, item.idmodificador, op.idopcionmodificador, op.nombreopcion, op.precioopcionmodificador);}}/>
                                                    </div>
                                                    <br/>
                                                </div>
                                            ))}
                                            <hr/>
                                         </div>
                                :
                                <div className="row">
                                            <br/>
                                            <div className="col-4">
                                            <span className="product-details-name">{item.nombremodificador}</span>
                                            </div>
                                            <div className="col-4">
                                                <span className="product-obligatory">Opcional</span>
                                            </div>
                                            <div className="col-4">
                                                <span className="product-price">+MX ${item.preciomodificador}</span>
                                                <input type="checkbox" className="checkbox disable-team team_values" value="1"
                                                    onClick={(e) => {selectedCheckbox(e, item.idmodificador, item.nombremodificador, item.preciomodificador);}}/>            
                                            </div>
                                            <br/><br/>
                                        </div>
                            ))}
                        </div>
                        }
                        <br/>
                        <textarea className="product-coments" rows="3" placeholder="Añade especificaciones y/o comentarios"></textarea>
                        <br/>
                        <div className="product-buttons">
                            <button className="btn btn-primary">Cantidad</button>
                            <button className="btn btn-primary" onClick={addCart.bind(this)}>Añadir al carrito: {productPrice}</button>
                        </div>
                    </div> 
                </div>
                <div className="col-5">
                    <div className="card">
                        <Carrito/>
                    </div>
                </div>
            </div>
        </div>
    )
}
