import React from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import  { useEffect, useState } from 'react'

function Modificadores() {
    const [pricemodifierchecked, setPriceModifierChecked] = useState(false);
    const [multiplechecked, setMultipleChecked] = useState(false);

    return (
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   <ControlPointIcon/>Modificadores
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <button className='btn btn-primary'><ControlPointIcon/>Agregar Nuevo Modificador</button>
                <button className='btn btn-primary'><ControlPointIcon/>Agregar Modificador Existente</button>
                <div>
                <form>
                    <div >
                        <label className="col-form-label"><b> Nombre modificador:</b></label>
                        <input type="text" className="form-control" />
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Obligatorio
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  value={multiplechecked} onChange={ e=> setMultipleChecked(e.target.value)}/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Multiple
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" value={pricemodifierchecked} onChange={ e=> setPriceModifierChecked(e.target.value)}/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Habilitar Precio
                        </label>
                    </div>
                    {pricemodifierchecked
                    ?
                     <div >
                        <label className="col-form-label"><b> Precio:</b></label>
                        <input type="text" className="form-control" />
                     </div>
                    :<div/>}
                    <br/>
                    {multiplechecked
                    ?
                     <div>
                        <b>Opción 1 del Modificador 1 </b>
                        <br/>
                        <form>
                            <div >
                                <label className="col-form-label"><b> Nombre opción:</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div >
                                <label className="col-form-label"><b> Precio:</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div >
                                <label className="col-form-label"><b> Ingredientes:</b></label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected></option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div >
                                <label className="col-form-label"><b> Porción utilizada:</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <button className='btn btn-primary'><ControlPointIcon/>Agregar Opción</button>
                        </form>
                        
                     </div>
                    :<div/>}
                    <br/>
                </form>
                </div>
                </div>
                </div>
            </div>
    )
}
export default Modificadores
