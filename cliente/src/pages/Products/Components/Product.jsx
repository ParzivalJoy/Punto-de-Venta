import React from 'react'
import product from '../../../assets/products.png'
import  { useEffect, useState } from 'react'


function Product() {
    const [pricechecked, setPriceChecked] = useState(false);
    const [stockchecked, setStockChecked] = useState(false);
    return (
        <div>
            <div>
                <form> 
                    <img src={product} width="150" height="150" className="rounded" alt="imagen producto"/>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02"/>
                        <label class="input-group-text" for="inputGroupFile02">Cargar</label>
                    </div>
                    <div >
                        <label className="col-form-label"><b> Nombre:</b></label>
                        <input type="text" className="form-control" />
                    </div>
                    <div >
                        <label className="col-form-label"><b> Código:</b></label>
                        <input type="text" className="form-control" />
                    </div>
                    <div >
                        <label className="col-form-label"><b> Descripción:</b></label>
                        <input type="text" className="form-control" />
                    </div>
                    <br/>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" value={pricechecked} onChange={ e=> setPriceChecked(e.target.value)}/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Habilitar Precio
                        </label>
                    </div>
                    {pricechecked
                    ?
                     <div >
                        <label className="col-form-label"><b> Precio:</b></label>
                        <input type="text" className="form-control" />
                     </div>
                    :<div/>}
                    <br/>
                    <div >
                        <label className="col-form-label"><b> Unidad:</b></label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div >
                        <label className="col-form-label"><b> Categoría:</b></label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <br/>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" value={stockchecked} onChange={ e=> setStockChecked(e.target.value)}/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Habilitar Inventario
                        </label>
                    </div>
                    {stockchecked
                    ?
                    <div>
                        <div >
                        <label className="col-form-label"><b> Cantidad inicial del producto:</b></label>
                        <input type="text" className="form-control" />
                        </div>
                        <div >
                            <label className="col-form-label"><b> Proveedor:</b></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div >
                            <label className="col-form-label"><b> Noficación de cantidad de producto:</b></label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    :<div/>
                    }
                    <br/>
                </form>
            </div>
        </div>
    )
}

export default Product