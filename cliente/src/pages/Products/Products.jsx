import React from 'react'
import Product from './Components/Product'
import Modificadores from './Components/Modificadores'
import Complementos from './Components/Complementos'
import Ingredientes from './Components/Ingredientes'
function Products() {
    return (
        <div>
            <div className="container px-4 px-lg-5 h-100">
                <Product/>
                <div className="accordion">
                    <Modificadores/>
                    <Complementos/>
                    <Ingredientes/>
                </div>
            </div>
        </div>
    )
}

export default Products