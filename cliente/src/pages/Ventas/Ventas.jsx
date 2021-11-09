import React, {useEffect, useState, Component} from 'react'
import Header from './Components/Header'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import Carrito from './Components/Carrito'
import { useHistory } from "react-router-dom";

export default function Ventas() {

    const [ListAllProducts, setAllProducts] = useState([])
    const [ListCategories, setCategories] = useState([])
    const [category, setCategory] = useState('Categorias')
    const [search, setSearch] = useState('')
   
    let history = useHistory();

    async function getAllProducts(){
        const {data} = await axios.get('http://localhost:5000/api/sales/products')
        clear()
        setCategory('Categorias')
        setAllProducts(data)
    }

    async function getCategories(){
        const {data} = await axios.get('http://localhost:5000/api/sales/categories')
        setCategories(data)
    }

    async function getProductsByCategory(idcategoria, nombrecategoria){
        const {data} = await axios.get('http://localhost:5000/api/sales/products/category'+`/${idcategoria}`)
        clear()
        setCategory(nombrecategoria)
        setAllProducts(data)
    }

    async function getProductByName(){
        const {data} = await axios.get('http://localhost:5000/api/sales/products/name'+`/${search}`)

        //Si no encuentra nada en la consulta de nombre, hace la consulta por código
        if (Object.entries(data).length === 0){
            getProductById()
        }else{
            clear()
            setAllProducts(data)
        }
    }

    async function getProductById(){
        const {data} = await axios.get('http://localhost:5000/api/sales/products/id'+`/${search}`)
        console.log(data)       
        if (Object.entries(data).length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'No se encuentra el producto en el sistema',
                timer: 1500
              })
        }else{
            clear()
            setAllProducts(data)
        }
    }
    
    async function getProductsByPrice1(){
        const {data} = await axios.get('http://localhost:5000/api/sales/products/price1')
        setAllProducts(data)
    }

    async function getProductsByPrice2(){
        const {data} = await axios.get('http://localhost:5000/api/sales/products/price2')
        setAllProducts(data)
    }

    async function getProductsByPrice3(){

        const {data} = await axios.get('http://localhost:5000/api/sales/products/price3')
        if (Object.entries(data).length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'No existen artículos con esos parámetros',
                timer: 1500
              })
            clear()
            getAllProducts()
        }else{
            clear()
            setAllProducts(data)
        }
    }

    function clear(){
        setAllProducts([])
        setCategory('Categorias')
    }

    useEffect(() =>{
        getAllProducts()
        getCategories()
    }, [])

    
    return (  
        <div className="sales">
            <Header/>
            <div className="search-bar">
                <div className="card search-card">
                    <div className="row">  
                        <div className="col-11">
                            <input type="text" placeholder="Buscar" className="search-input" onChange={ e=> setSearch(e.target.value)}/>
                        </div>
                        <div className="col-1"><button className="btn btn-primary" onClick={getProductByName.bind(this)}><SearchIcon/></button></div>
                    </div>
                </div> 
            </div>
            <div className="row">
                <div className="col-7">
                    <div className="card dropdown-card">
                        <div className="row">
                            <div className="col-8">
                            </div>
                            <div className="col-2">
                                <DropdownButton id="dropdown-basic-button" title={category}>
                                    <DropdownItem onClick={getAllProducts.bind(this)}>Todos los productos</DropdownItem>
                                    {ListCategories.map(item =>(
                                    <div>     
                                        <Dropdown.Item onClick={getProductsByCategory.bind(this, item.idcategoria, item.nombrecategoria)} key={item.nombrecategoria}>{item.nombrecategoria}</Dropdown.Item>       
                                    </div>
                                    ))}
                                </DropdownButton>
                            </div>
                            <div className="col-2">
                                <DropdownButton id="dropdown-basic-button" title='Filtros'>
                                    <DropdownItem onClick={getProductsByPrice1.bind(this)}>Precio $</DropdownItem>
                                    <DropdownItem onClick={getProductsByPrice2.bind(this)}>Precio $$</DropdownItem>
                                    <DropdownItem onClick={getProductsByPrice3.bind(this)}>Precio $$$</DropdownItem>
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                    <div className="card catalogue-card">
                        <div className="row">
                        {ListAllProducts.map(item => (
                            <div className="card product-card col-5">
                                <div className="row">
                                    <div className="col-12 product-info">
                                        <span className="product-name" key={item.nombreproducto}>{item.nombreproducto}</span>
                                        <span className="product-descr" key={item.descripcionproducto}>{item.descripcionproducto}</span>
                                        <br/>
                                        <span className="product-price" key={item.precioproducto}>MX ${item.precioproducto}</span>
                                        <br/>
                                        <Link to={'/product'+`/${item.idproducto}`} className="btn btn-primary" key={item.idproducto}>
                                                Agregar
                                        </Link>     
                                    </div>   
                                </div>
                                <hr/>
                            </div>
                        ))}
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
