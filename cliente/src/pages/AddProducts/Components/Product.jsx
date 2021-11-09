import React from 'react'
import product from '../../../assets/products.png'
import '../../../styles.scss';
import  { useEffect, useState } from 'react'
import axios from 'axios' //npm i axios

const baseURL = process.env.REACT_APP_API_URL //npm i dotenv

function Product(props) {
    const [listcategories, setListCategories] = useState([])
    const [msg, setMsg]=useState('')
    const errors ={
        imageproduct:'',
        nameproduct:'', 
        priceproduct:'', 
        costproduct:'',
        idproduct:'', 
        descriptionproduct:'',
        stockinitproduct:'', 
        stocknotifiproduct:'',
        namecategory:'',
        unitproduct:'',
        categoryproduct:''}
    const expresiones = {
	text: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras, numeros y espacio, almenos cuatro letras
	textnumbers: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    int:/^[0-9]{1,20}$/,   //mayusculas, minusculas y numeros
	float:/^[0-9.]{1,20}$/, // 1 a 20 digitos con punto.
    }

    useEffect(() => {
        getCategories()
    },[])

    inputValidation()
    
    const convertiraBase64=(archivos)=>{
        Array.from(archivos).forEach(archivo=>{
          if(archivo.type.match(/image.*/i)){
            const imgurl= URL.createObjectURL(archivo)
            props.setImagebinary(imgurl)
            var formData = new FormData();
            var fileField = document.querySelector("input[type='file']");
            formData.append('file', fileField.files[0]);
            props.setFormdatas(formData)
            console.log(fileField.files[0])
            props.setFormProduct({
                ...props.formproduct,
                ['imageproduct']: imgurl
            });
          }else{
              props.setImagebinary(null)
          }
        })
      }
    async function getCategories(){
        const { data } = await axios.get(baseURL+'/products/categories')
        setListCategories(data)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        props.setFormProduct({
            ...props.formproduct,
            [name]: value
        });
    };
    async function handleChangeCategory(e){
        props.setFormProduct({
            ...props.formproduct,
            ['categoryproduct']: e.target.value
        });
        props.setNewCategory(false)
        if(e.target.value==='0'){
            props.setNewCategory(true)
        }
    };
    


    function  inputValidation(){
        if(!expresiones.text.test(props.formproduct.nameproduct)){
            if(props.formproduct.nameproduct===''){
                errors.nameproduct="*Campo obligatorio."
                props.setFormValid(false)
            }else{
                errors.nameproduct="Este campo no puede contener números."
                props.setFormValid(false)
            }
        }else{
            errors.nameproduct=""
            props.setFormValid(true)
        }

        if(!expresiones.int.test(props.formproduct.idproduct)){
            if(props.formproduct.idproduct===''){
                errors.idproduct="*Campo obligatorio."
                props.setFormValid(false)
            }else{
                errors.idproduct="Este campo solo puede contener numeros sin espacios."
                props.setFormValid(false)
            }
        }else{
            errors.idproduct=""
            props.setFormValid(true)
        }

        if(!expresiones.float.test(props.formproduct.priceproduct)){
            if(props.formproduct.priceproduct===''){
                errors.priceproduct="*Campo obligatorio."
                props.setFormValid(false)
            }else{
                errors.priceproduct="Este campo solo puede contener numeros enteros o decimales."
                props.setFormValid(false)
            }
        }else{
            errors.priceproduct=""
            props.setFormValid(true)
        }

        if(!expresiones.int.test(props.formproduct.stockinitproduct)){
                errors.stockinitproduct="Este campo solo puede contener numeros enteros."
                props.setFormValid(false)
        }else{
            if(props.formproduct.stockinitproduct==='0'){
                errors.stockinitproduct="*Campo Obligatorio."
                props.setFormValid(false)
            }else{
                errors.stockinitproduct=""
                props.setFormValid(true)
            }
        }
        if(!expresiones.int.test(props.formproduct.stocknotifiproduct)){
                errors.stocknotifiproduct="Este campo solo puede contener numeros enteros."
                props.setFormValid(false)
        }else{
            if(props.formproduct.stocknotifiproduct==='0'){
                errors.stocknotifiproduct="*Campo obligatorio."
                props.setFormValid(false)
            }else{
                errors.stocknotifiproduct=""
                props.setFormValid(true)
            }
        }
        
        if(!expresiones.float.test(props.formproduct.costproduct)){
            errors.costproduct="Este campo solo puede contener numeros enteros o decimales."
            props.setFormValid(false)
        }else{
            errors.costproduct=""
            props.setFormValid(true)
        }

        if(!expresiones.text.test(props.namecategory)){
            if(props.namecategory===''){
                errors.namecategory="*Campo obligatorio."
                props.setFormValid(false)
            }else{
                errors.namecategory="Este campo no puede contener números."
                props.setFormValid(false)
            }
        }else{
            errors.namecategory=""
            props.setFormValid(true)
        }

        if(!expresiones.float.test(props.formproduct.costproduct)){
            errors.costproduct="Este campo solo puede contener numeros enteros o decimales."
            props.setFormValid(false)
        }else{
            errors.costproduct=""
            props.setFormValid(true)    
        }

        if(props.formproduct.categoryproduct===''){
            errors.categoryproduct='*Campo obligatorio.'
            props.setFormValid(false)
        }else{
            errors.categoryproduct=''
            props.setFormValid(true)}
        
        if(props.formproduct.unitproduct===''){
            errors.unitproduct='*Campo obligatorio.'
            props.setFormValid(false)
        }else{
            errors.unitproduct=''
            props.setFormValid(true)}

    }
    return (
        <div>
            <div className="p-2 border mt-3">
                <h2>Nuevo Producto</h2>
            </div>
                <div className="row d-flex justify-content-center border">
                    <div  className="col-md mt-2 " align="center">
                        <img src={(props.imagebinary===null) ? product : props.imagebinary} width="150" height="150" className="rounded" alt="imagen producto " align="center"/>
                    </div>
                    <div  className="col-md-9 mt-5" align="center">
                        <div className="input-group">
                            <input type="file" className="form-control" id="file" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)} />
                            {errors.imageproduct && <p className="text-danger">{errors.imageproduct}</p>}
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center border">
                <div className=" mb-3 col-md-4 mt-2">
                    <label className="col-form-label"> <b>Nombre:</b></label>
                    <input type="text" className="form-control" name="nameproduct" value={props.formproduct.nameproduct} onChange={ handleChange}/>
                    {errors.nameproduct && <p className="text-danger">{errors.nameproduct}</p>}
                </div>
                <div className="mb-3 col-md-4 mt-2">
                    <label className="col-form-label"> <b>Codigo:</b></label>
                    <input type="text" className="form-control"  name ="idproduct" value={props.formproduct.idproduct} onChange={handleChange}/>
                    {errors.idproduct && <p className="text-danger">{errors.idproduct}</p>}
                </div>
                <div className="mb-3 col-md-4 mt-2" >
                    <label className="col-form-label"><b> Descripción:</b></label>
                    <input type="text" className="form-control"  name="descriptionproduct" value={props.formproduct.descriptionproduct} onChange={ handleChange} />
                    {errors.descriptionproduct && <p className="text-danger">{errors.descriptionproduct}</p>}
                </div>
                <div className="mb-3 col-md-4 mt-2 " >
                    <label className="col-form-label"><b> Precio:</b></label>
                    <input type="text" className="form-control"  name="priceproduct" value={props.formproduct.priceproduct} onChange={ handleChange}/>
                    {errors.priceproduct && <p className="text-danger">{errors.priceproduct}</p>}
                    </div>
                <div className="mb-3 col-md-4 mt-2" >
                    <label className="col-form-label"><b> Costo:</b></label>
                    <input type="text" className="form-control"  name="costproduct" value={props.formproduct.costproduct} onChange={ handleChange}/>
                    {errors.costproduct && <p className="text-danger">{errors.costproduct}</p>}
                    </div>
                <div className="mb-3 col-md-4 mt-2 ">
                    <label className="col-form-label"><b> Unidad:</b></label>
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name="unitproduct" value={props.formproduct.unitproduct} onChange={handleChange}>
                        <option value="0">Seleccione una unidad</option>
                        {props.listunits.map((unit) => (
                            <option
                                value={unit.idunidad}
                                key={unit.idunidad}
                            >
                                {unit.nombreunidad}
                            </option>
                            ))}
                    </select>
                    {errors.unitproduct && <p className="text-danger">{errors.unitproduct}</p>}
                </div>
                <div className="mb-3 col-md-4" >
                    <label className="col-form-label"><b> Categoría:</b></label>
                    <select
                        className="form-select" aria-label="Floating label select example" name="categoryproduct" value={props.formproduct.categoryproduct} onChange={handleChangeCategory}>
                        <option value="-1">Seleccione una Categoria</option>
                        <option value="0">Nueva Categoria</option>
                        {listcategories.map((category) => (
                        <option
                            value={category.idcategoria}
                            key={category.idcategoria}
                        >
                            {category.nombrecategoria}
                        </option>
                        ))}
                    </select>
                    {errors.categoryproduct && <p className="text-danger">{errors.categoryproduct}</p>}
                </div>
                {props.newcategory
                ?
                <div className="mb-3 col-md-4" >
                    <label className="col-form-label"><b> Nombre Categoría:</b></label>
                    <input type="text" className="form-control" name="namecategory" value={props.namecategory} onChange={ e=> props.setNameCategory(e.target.value)}/>
                    {errors.namecategory && <p className="text-danger">{errors.namecategory}</p>}
                </div>
                :<div className="mb-3 col-md-1 mt-2"/>
                }
                <br/>
                <div className="mb-3 col-md-4 mt-3" align="center" >
                    <br/>
                    <input className="form-check-input" type="checkbox" checked={props.stockchecked} onChange={ e=> props.setStockChecked(!props.stockchecked)}/>
                    <label className="form-check-label" >
                            Habilitar Inventario
                    </label>
                </div>
                {props.stockchecked
                ?
                <div className="row d-flex justify-content-center border">
                    <div className="mb-2 col-md-4" >
                    <label className="col-form-label"><b> Cantidad inicial del producto:</b></label>
                    <input type="text" className="form-control" name="stockinitproduct" value={props.formproduct.stockinitproduct} onChange={ handleChange}/>
                    {errors.stockinitproduct && <p className="text-danger">{errors.stockinitproduct}</p>}
                    </div>
                    <div className="mb-2 col-md-5">
                        <label className="col-form-label"><b> Noficación de cantidad de producto:</b></label>
                        <input type="text" className="form-control" name="stocknotifiproduct" value={props.formproduct.stocknotifiproduct} onChange={ handleChange} />
                        {errors.stocknotifiproduct && <p className="text-danger">{errors.stocknotifiproduct}</p>}
                    </div>
                </div>
                :<div/>
                }
                </div>
        </div>
    )
}

export default Product