import React from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export default function Info() {
    

    return (
        <div className="sales-info">
                    <div className="sales-kart">
                        <div className="sales-kart-title">
                            <LocalGroceryStoreIcon className="kart-icon"/>
                            <span className="kart-title">Carrito de compras</span>
                        </div>
                        <div className="kart-info">
                            <div className="row">
                             <div className="col-md-2">
                                 <FastfoodIcon className="kart-info-icon"/>
                             </div>
                                <div className="col kart-product-info">       
                                    <span className ="kart-product-name">Producto 1</span>
                                    <span className ="kart-product-comp">Complementos</span>
                                </div>
                            </div>             
                        </div>
                    </div>



                    <div className="sales-ticket">
                        Ticket
                    </div>
                </div>
    )
}
