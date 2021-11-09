import React, {useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useHistory } from "react-router-dom";


export default function Carrito() {
    
    var TotalCarrito = 0
    let history = useHistory()

    const [productdata, setProductData] = useState([])
    const [complementdata, setComplementData] = useState([])
    const [multipledata, setMultipleData] = useState([])

    function getDatos(){
        if(localStorage["productdatas"]){
            setProductData(JSON.parse(localStorage["productdatas"]))
        }
        if(localStorage["complementdatas"]){
            setComplementData(JSON.parse(localStorage["complementdatas"]))
        }
        if(localStorage["multipledatas"]){
            setMultipleData(JSON.parse(localStorage["multipledatas"]))
        }
        productdata.map(item =>(
            TotalCarrito += item.precioproducto
        ))

        complementdata.map(item =>(
            TotalCarrito += item.precio
        ))

        multipledata.map(item =>(
            TotalCarrito += item.precio
        ))
  
        localStorage.setItem('Totalpagar',TotalCarrito)
    }


    function LimpiarElemento(idcarrito){
        var indexproduct = productdata.findIndex((obj => obj.idcarrito == idcarrito))
            
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Eliminarás el artículo del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El artículo ha sido eliminado.',
                'success'
              )
                //Busca el producto por indice del carrito y lo elimina
            if(indexproduct >= 0){
                productdata.splice(indexproduct, 1)
            }

            //Recorre los arreglos, elimina los elementos que coincidan con el idcarrito
            complementdata.forEach(function(elemento, indice, array){
                if(elemento.idcarrito === idcarrito){
                    complementdata.splice(indice, 1)
                }
            })

            multipledata.forEach(function(elemento, indice, array){
                if(elemento.idcarrito === idcarrito){
                    multipledata.splice(indice, 1)
                }
            })

            localStorage.removeItem("productdatas")
            localStorage.removeItem("complementdatas")
            localStorage.removeItem("multipledatas")

            localStorage["productdatas"] = JSON.stringify(productdata)
            localStorage["complementdatas"] = JSON.stringify(complementdata)
            localStorage["multipledatas"] = JSON.stringify(multipledata)
            
            history.push("/ventas")  
            }
          })
            

    }

    const selectedComplement = (e) => {
        const value = e.target.value
        console.log(value)
    }

    function LimpiarCarrito(){
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Eliminarás todo el carrito de compras",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El carrito ha sido eliminado.',
                'success'
              )
                localStorage.removeItem("productdatas")
                localStorage.removeItem("complementdatas")
                localStorage.removeItem("multipledatas")
                window.location.reload(true);
            }
          })
        
    }

    useEffect(() =>{
        getDatos()  
    }, [])

    console.log(productdata)

    return (
        <div className="carrito">
            <div className="card products-cart"> 
            {productdata.map(item =>(
                <div className="card">
                    <div className="row">
                        <div className="col-5" algin="center">
                            {item.nombreproducto}
                        </div>
                        <div className="col-2" align="center">
                            <div className="cart-com-mod">
                                <span className="cart-comp">Complementos</span>
                                <span className="cart-comp">Modificadores</span>
                            </div>
                        </div>  
                        <div className="col-4">
                            <DeleteForeverIcon className="icons delete-icon" onClick={LimpiarElemento.bind(this, item.idcarrito)}/>
                            <input type="number" className="product-cant-input" placeholder="1" min="1" max="10" defaultValue={item.cantidad}/>
                        </div>
                    </div>
                </div>  
            ))}
            </div>
            <div className="input-cart">
                <button className="btn btn-primary btn-carrito" onClick={LimpiarCarrito.bind(this)}>Limpiar</button>
                <Link to="/cobrocarrito" className="btn btn-primary">Cobrar</Link> 
            </div>
        </div>
    )
}
