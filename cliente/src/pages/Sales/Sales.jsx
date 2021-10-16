import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Header from './Components/Header'

const CategoryURL = process.env.REACT_APP_API_CATEGORY_URL
 
export default function Sales() {
    const [listCategories, setListCategories] = useState([])
    const [listProducts, setListProducts] = useState([])

    useEffect(() =>{
        getCategories()
    }, [])

    async function getCategories(){
        const {data} = await axios.get('http://localhost:5000/api/categories')
        setListCategories(data)
    }

    async function getProducts(idcategoria){
        const {data} = await axios.get('http://localhost:5000/api/categories'+`/${idcategoria}`)
        setListProducts(data)
    }

  

    return (
        <div className="sales">
            <Header/>
            <div className="sales-body">
            <div className="sales-catalogue">
            {listCategories.map(item =>(
                    <div className="card category-card" >    
                            <div className="card-header product-header" onClick={getProducts.bind(this, item.idcategoria)}>
                                {item.nombrecategoria}          
                            </div>
                            <div className="row">
                            {listProducts.map(product_item =>(    
                                <div className="col-sm-6">
                                    {(product_item.idcategoria === item.idcategoria) ? 
                                    <div className="card product-card">   
                                        <div className="card-body sales-products" >
                                                <div className="productimage">
                                                    <img src={`data:image/jpeg;base64,${product_item.encode}`} alt="Imagen" width="100px" height="100px" />
                                                </div>
                                                <div className="product-cont">
                                                    <span className="card-product-name">{product_item.nombreproducto}</span>
                                                    <span className="card-product-descrip">{product_item.descripcionproducto}</span>                                        
                                            </div>
                                        </div>
                                            <Link to={'/sales'+`/${product_item.idproducto}`} className="btn btn-primary">
                                                Detalles
                                            </Link>     
                                    </div>
                                    : '' } 
                                </div>
                                ))}
                            </div>   
                        </div>   
                    ))}      
                  </div>
            </div>
            
        </div>
    )
}
