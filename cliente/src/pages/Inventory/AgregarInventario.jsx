import React,{useState, useEffect} from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";
import imgavailable from './imgs/noavailable.jpg'

function AgregarInventario() {

    const[productonuevo, setProductonuevo]= useState(false)
    const[esproducto, setEsproducto]= useState(3)
    const[habilitar,setHabilitar]= useState(false)
    const[habilitaring, setHabilitaring]= useState(false)
    const[products, setProducts]= useState([]);
    const[actualproduct, setActualProduct]= useState(null);
    const[actualingredient,setActualIngredient]= useState(null)
    const[ingredients, setIngredients]= useState([])
    const[productname, setProductname]= useState('');
    const[productcode, setProductCode]=useState('');
    const[productcost, setProductcost]= useState('');
    const[productprice, setProductprice]= useState(0);
    const[productdescrip, setProductdescrip]= useState('');
    const[productunidad, setProductunidad]= useState(6);
    const[productstock, setProductstock]= useState('');
    const[productproveedor, setProductproveedor]= useState('');
    const[productcategoria, setProductcategoria]= useState('');
    const[productstocknotif, setProductstocknotif]= useState('');
    const[productnamevalid, setProductnamevalid]= useState(null);
    const[productcodevalid, setProductcodevalid]= useState(null);
    const[productpricevalid, setProductpricevalid]= useState(null);
    const[productcostvalid, setProductcostvalid]= useState(null);
    const[productstockvalid, setProductstockvalid]= useState(null);
    const[productstocknotifvalid, setProductstocknotifvalid]= useState(null);
    const[productprovidvalid, setProductprovidvalid]= useState(null);
    const[productcategovalid, setProductcategovalid]= useState(null);
    const[productimagenvalid, setImageproductvalid]= useState(null);
    const[todosvalidos, setTodosvalidos]= useState(null);
    const[productidproveedor, setIdproveedor]= useState(null)
    const[productIdcategoria, setIdcategoria]= useState(null)
    const[stockparcial, setStockparcial]=useState('')
    const[blockbutton, setBlockbutton]=useState(false);
    const[loading, setLoading]= useState(false)
    const[formDataS, setFormdatas]= useState(null)
    const[imagebinary, setImagebinary] = useState(null)

    const cleanstates=()=>{
          setActualProduct('')
          setProductprice(0)
          setProductcost('')
          setProductunidad('')
          setProductstock('')
          setProductproveedor('')
          setProductcategoria('')
          setProductdescrip('')
          setProductCode('')
          setProductunidad(6)
          setProductname('');
          setProductstocknotif('');
          setProductnamevalid(null);
          setProductcodevalid(null);
          setProductcostvalid(null)
          setProductpricevalid(null)
          setProductstockvalid(null)
          setProductstocknotifvalid(null)
          setProductprovidvalid(null)
          setProductcategovalid(null)
          setTodosvalidos(null)
          setHabilitaring(false)
          setStockparcial('');
          setFormdatas(null)
          setImagebinary(null)
    }

    const handleChangeCh = () =>{
        setProductonuevo(!productonuevo)
        setHabilitar(!habilitar)
        handleShowAllMerca(); 
        handleShowAllMerca2();
        setEsproducto(3)
        
         cleanstates();     
    }

    const handleShowAllMerca2= async (e)=>{
      const res = await fetch(
        `http://localhost:5000/inventario/getInventario/1`
      );
      const data = await res.json();
      setIngredients(data);
    }

    const handleShowAllMerca = async (e) => {
      
        const res = await fetch(
          `http://localhost:5000/inventario/getInventario/2`
        );
        const data = await res.json();
        setProducts(data);
      
    };

    const handleChangeChIng =()=>{

      setHabilitaring(!habilitaring)
    }

    const handleActualIngredient = async (actualingredient) =>{

        setEsproducto(2);

        if(actualingredient===''){
          alert('no hay ingredientes, ingresa algunos!')
        }else{
          const res = await fetch(
            `http://localhost:5000/inventario/getActualIngredient/${actualingredient}`
          );
          const data = await res.json();
          setProductprice(0);
          setProductunidad(data.idunidad);
          setProductstock(data.cantidadingrediente);
          setStockparcial(data.cantidadingrediente);
          setProductcategoria("los ingredientes no tienen categoria");
          setProductdescrip("los ingredientes no guardan descripción");
          setProductCode(data.idingrediente);
          setProductname(data.nombreingrediente)
          setProductstocknotif(data.cantidadnotificacioningrediente)
          setIdproveedor(data.idproveedor);
          setProductcost(data.costo)
          setProductproveedor(data.nombreproveedor);
          setImagebinary(null)
          setFormdatas(null)
        }
      }

    const handleActualProduct = async (actualproduct) =>{

        setEsproducto(1);
      if (actualproduct!=='') {
        const res = await fetch(
          `http://localhost:5000/inventario/getActualProduct/${actualproduct}`
        );
        const data = await res.json();
        setProductprice(data.precioproducto);
        setProductcost(data.costoproducto);
        setProductunidad(data.idunidad);
        setProductcategoria(data.nombrecategoria)
        setIdcategoria(data.idcategoria)
        setProductstock(data.cantidadproducto);
        setStockparcial(data.cantidadproducto);
        setProductdescrip(data.descripcionproducto);
        setProductCode(data.idproducto);
        setProductname(data.nombreproducto);
        setProductstocknotif(data.cantidadnotificacionproducto)
        var imgblob= data.imagebproducto;
        ///////////////////Conseguir la imagen actual para mostrarla///////////////////////
        if(imgblob===null){
          setImagebinary(null)
        }else{
          const resb = await fetch(
            `http://localhost:5000/inventario/bringImgs/${imgblob}`
          );
          const datab = await resb.blob();
          var sauce= URL.createObjectURL(datab)
          setImagebinary(sauce)
        }
        //////////////////Para obtener el proveedor primero se obtiene el id////////////////
        const res1 = await fetch(
          `http://localhost:5000/inventario/getActualProveedorId/${actualproduct}`
        );
        const data1 = await res1.json();
        setIdproveedor(data1.idproveedor);
        const idproveedor2= data1.idproveedor;
        ///////////////////Con el idproveedor después obtenemos el nombre de proveedor////////
        const res2 = await fetch(
          `http://localhost:5000/inventario/getActualProveedorName/${idproveedor2}`
        );
        const data2 = await res2.json();
        setProductproveedor(data2.nombreproveedor);
      }else{
        alert('no hay productos, inserta algunos!')
      }  
    }
    ///////////////////////////////////////////////////
    ///////////////Funcion para obtener la url de la imagen y mostrarla ///////////////////////////////
    const convertiraBase64=(archivos)=>{
      Array.from(archivos).forEach(archivo=>{
        if(archivo.type.match(/image.*/i)){
          const imgurl= URL.createObjectURL(archivo)
          setImagebinary(imgurl)
          var formData = new FormData();
          var fileField = document.querySelector("input[type='file']");
          formData.append('file', fileField.files[0]);
          setFormdatas(formData)
          setImageproductvalid('true')
        }else{
            setImagebinary(null)
            setImageproductvalid('false')
            setTodosvalidos('false')
        }
      })
    }
    /////////////////////////////////////////////////////////////////
    //función para insertar un nuevo producto/ingrediente
  const handleSubmitInsertion1 = async (e) => {
      e.preventDefault();
      setBlockbutton(true)
      setLoading(true)

      if(todosvalidos === 'true'){
        if (habilitar === true) {

          const res = await fetch(
            `http://localhost:5000/inventario/getActualProduct/${productcode}`
          );
          const dataV = await res.json();

          if(dataV===null){

            const res = await fetch(
              `http://localhost:5000/inventario/insertProduct`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  productname,
                  productdescrip,
                  productprice,
                  productcost,
                  productstock,
                  productunidad,
                  productstocknotif, 
                }),
              }
            );
            await res.json();
            /////////////////Inserción de la imagen /////////////////////////////////
            const resImgs = await fetch(
              `http://localhost:5000/inventario/manejoImgs/${productcode}`,
              {
                method: "PUT",
                body: formDataS
              }
            );
            const dataImgs = await resImgs.json();
            console.log(dataImgs)

            const res1 = await fetch(
              `http://localhost:5000/inventario/getProveedor/${productproveedor}`
            );
            const data1 = await res1.json();
            /////Si no existe ese nombre de proveedor, crearlo////
            if(data1===null){
              const res2 = await fetch(
                `http://localhost:5000/inventario/insertProveedor`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    productproveedor
                  }),
                }
              );
              await res2.json();
            }
            /////Se consigue el id del proveedor recien creado//////////////////
            const res3 = await fetch(
              `http://localhost:5000/inventario/getProveedor/${productproveedor}`,
            );
            const data3 = await res3.json();
            setIdproveedor(data3.idproveedor)
            const idproveedor1= data3.idproveedor;
            //////////al conseguirse el id del proveedor, se inserta este y los demas datos a proveedor-producto///
            const res4 = await fetch(
              `http://localhost:5000/inventario/insertProveedorProduct`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  idproveedor1,
                  productstock,
                  productcost,
                  productcode
                }),
              }
            );
            await res4.json();
            /////Ahora la categoria
            const res5 = await fetch(
              `http://localhost:5000/inventario/getCategoria/${productcategoria}`
            );
            const data5 = await res5.json();
            /////Si no existe ese nombre de categoria, crearla////
            if(data5===null){
              const res6 = await fetch(
                `http://localhost:5000/inventario/insertCategoria`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    productcategoria
                  }),
                }
              );
               await res6.json();
            }
             /////Se consigue el id de la categoria recien creada//////////////////
             const res7 = await fetch(
              `http://localhost:5000/inventario/getCategoria/${productcategoria}`,
            );
            const data7 = await res7.json();
            const idcategoria1= data7.idcategoria;
            ////////////////el id de la categoria se inserta en la tabla productos///////////////////
            const res8 = await fetch(
              `http://localhost:5000/inventario/insertCategoria2`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  idcategoria1
                }),
              }
            );
            const data8 = await res8.json();
            console.log(data8)
          }else{
            alert('no se insertó la información, el código de producto ya existe')
            setProductCode('')
            return;
          }

        } else {
  
          if(esproducto===1){
            const stockParcial1= parseFloat(productstock)+parseFloat(stockparcial)
            const res = await fetch(
              `http://localhost:5000/inventario/editProduct`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  productname,
                  productdescrip,
                  productprice,
                  productcost,
                  stockParcial1,
                  productunidad,
                  productstocknotif,
                }),
              }
            );
            await res.json();
            /////////////////Editar imgs/////////////////////////
            if(formDataS!==null){
              const resImgs = await fetch(
                `http://localhost:5000/inventario/manejoImgs/${productcode}`,
                {
                  method: "PUT",
                  body: formDataS
                }
              );
              await resImgs.json();
            }
            const res2 = await fetch(
              `http://localhost:5000/inventario/editProveedorPro`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productproveedor,
                  productidproveedor
                }),
              }
            );
            await res2.json();

            const res3 = await fetch(
              `http://localhost:5000/inventario/editProveedorPro2`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  productidproveedor,
                  productcost,
                  productstock
                }),
              }
            );
            await res3.json();

            const res4 = await fetch(
              `http://localhost:5000/inventario/getCategoria/${productcategoria}`
            );
            const data4 = await res4.json();
            /////Si no existe ese nombre de categoria, crearla////
            if(data4===null){
              const res5 = await fetch(
                `http://localhost:5000/inventario/insertCategoria`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    productcategoria
                  }),
                }
              );
               await res5.json();
            }
             /////Se consigue el id de la categoria recien creada//////////////////
             const res6 = await fetch(
              `http://localhost:5000/inventario/getCategoria/${productcategoria}`,
            );
            const data6 = await res6.json();
            const idcategoria1= data6.idcategoria;
            ////////////////el id de la categoria se inserta en la tabla productos///////////////////
            const res7 = await fetch(
              `http://localhost:5000/inventario/insertCategoria2`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  idcategoria1
                }),
              }
            );
            const data7 = await res7.json();
            console.log(data7)
            setBlockbutton(false)
          }
          else{
            const stockParcial1= parseFloat(productstock)+parseFloat(stockparcial)
            const res = await fetch(
              `http://localhost:5000/inventario/editIngredient`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  productname,
                  productstocknotif,
                  stockParcial1,
                  productunidad
                }),
              }
            );
            const data = await res.json();
            console.log(data);

            const res2 = await fetch(
              `http://localhost:5000/inventario/editProveedorPro`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productproveedor,
                  productidproveedor
                }),
              }
            );
            const data2 = await res2.json();
            console.log(data2)

            const res3 = await fetch(
              `http://localhost:5000/inventario/editProveedorIng2`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productcode,
                  productidproveedor,
                  productcost,
                  productstock
                }),
              }
            );
            const data3 = await res3.json();
            console.log(data3)
          }
        }
        cleanstates();
        alert('Tu información se dio de alta exitosamente')
      }else{
        alert('Error. Revisa los campos que llenaste')
      }
      setBlockbutton(false)
      setLoading(false)
    };

    const handleSubmitInsertion2= async (e)=>{
      e.preventDefault();
      setLoading(true)

      if(todosvalidos==='true'){

        const res = await fetch(
          `http://localhost:5000/inventario/getActualIngredient/${productcode}`
        );
        const dataV = await res.json();

        if(dataV===null){

          const res= await fetch(`http://localhost:5000/inventario/insertIngredient`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              productcode,
              productname,
              productstocknotif,
              productstock,
              productunidad
            })
          })
          const data = await res.json();
          console.log(data)
          ///////////inserción de la parte de proveedores/////////////////////////////
          const res1 = await fetch(
            `http://localhost:5000/inventario/getProveedor/${productproveedor}`
          );
          const data1 = await res1.json();
          /////Si no existe ese nombre de proveedor, crearlo////
          if(data1===null){
            const res2 = await fetch(
              `http://localhost:5000/inventario/insertProveedor`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productproveedor
                }),
              }
            );
            const data2 = await res2.json();
            console.log(data2)
          }
          /////Se consigue el id del proveedor recien creado//////////////////
          const res3 = await fetch(
            `http://localhost:5000/inventario/getProveedor/${productproveedor}`,
          );
          const data3 = await res3.json();
          setIdproveedor(data3.idproveedor)
          const idproveedor1= data3.idproveedor;
          //////////al conseguirse el id del proveedor, se inserta este y los demas datos a proveedor-producto///
          const res4 = await fetch(
            `http://localhost:5000/inventario/insertProveedorIng`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idproveedor1,
                productstock,
                productcost,
                productcode
              }),
            }
          );
          const data4 = await res4.json();
          console.log(data4)
          ///////////////////////////////////////////////////////////////////////////////////
          cleanstates();
          alert('Tu información se dió de alta de manera exitosa')
        }else{
          alert('no se insertó la información, el código del ingrediente ya existe')
          setProductCode('')
        }
      } else{
        alert('Error. Revisa la información que llenaste')
      }
      setLoading(false)
    }
//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////Funciones para la validación de los campos////////////////////////
const validacion = () =>{
        setTodosvalidos('true')
      if(expresiones.nombre.test(productname)){
        setProductnamevalid('true')
      } else{
        setProductnamevalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.codigo.test(productcode)){
        setProductcodevalid('true')
      } else{
        setProductcodevalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.numerosfloat.test(productcost)){
        setProductcostvalid('true')
      } else{
        setProductcostvalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.numerosfloat.test(productprice)){
        setProductpricevalid('true')
      } else{
        setProductpricevalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.numerosfloat.test(productstock)){
        setProductstockvalid('true')
      } else{
        setProductstockvalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.numerosfloat.test(productstocknotif)){
        setProductstocknotifvalid('true')
      } else{
        setProductstocknotifvalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.nombre.test(productproveedor)){
        setProductprovidvalid('true')
      } else{
        setProductprovidvalid('false')
        setTodosvalidos('false')
      }
      if(expresiones.nombre.test(productcategoria)){
        setProductcategovalid('true')
      } else{
        setProductcategovalid('false')
        setTodosvalidos('false')
      }
}
const expresiones = {
	usuario: /^[a-zA-Z0-9\s]{4,16}$/, // Letras, numeros y espacio
	nombre: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  codigo:/^[a-zA-Z0-9]{1,40}$/,   //mayusculas, minusculas y numeros
	numerosfloat:/^[0-9.]{1,20}$/, // 1 a 20 digitos con punto.
}
//////////////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
          handleShowAllMerca();
          handleShowAllMerca2();
    },[habilitar])

    return (
      <div className="container">
        {loading === true ? (
          <div
            className="d-flex justify-content-center align-items-center"
            id="cargascreen"
          >
            <div>
              <PacmanLoader size={30} color={"#123adc"} loading={loading} />
            </div>
          </div>
        ) : (
          <div>
            <div className="p-2 border mt-3">
              <h2>Llene el formulario</h2>
            </div>

            <form
              className="mt-3 row my-3 d-flex justify-content-center border"
              id="formulario"
            >
              <div className="mb-3 form-check m-3 border col-md-10 col-11">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={productonuevo}
                  onChange={handleChangeCh}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Es un producto nuevo?
                </label>
              </div>

              <div className=" row d-flex justify-content-center border">
                {habilitar ? (
                  <h6>No necesitas este menú por ahora ;)</h6>
                ) : (
                  <h6>Selecciona un producto o ingrediente!</h6>
                )}
                <div
                  className="form-floating col-md-4 align-self-center p-3"
                  style={
                    esproducto === 1
                      ? { background: "#CCFFC0" }
                      : { background: "white" }
                  }
                >
                  <p className="mb-0">Productos:</p>
                  <select
                    className="form-select"
                    id="nombrePedir"
                    aria-label="Floating label select example"
                    onChange={(e) => setActualProduct(e.target.value)}
                    onClick={(e) => handleActualProduct(e.target.value)}
                    disabled={habilitar}
                  >
                    {products.map((product) => (
                      <option
                        value={product.idproducto}
                        key={product.idproducto}
                      >
                        {product.nombreproducto}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="form-floating col-md-4 offset-md-2 align-self-center p-3"
                  style={
                    esproducto === 2
                      ? { background: "#CCFFC0" }
                      : { background: "white" }
                  }
                >
                  <p className="mb-0">Ingredientes:</p>
                  <select
                    className="form-select"
                    id="nombrePedir"
                    aria-label="Floating label select example"
                    onChange={(e) => setActualIngredient(e.target.value)}
                    onClick={(e) => handleActualIngredient(e.target.value)}
                    disabled={habilitar}
                  >
                    {ingredients.map((ingredient) => (
                      <option
                        value={ingredient.idingrediente}
                        key={ingredient.idingrediente}
                      >
                        {ingredient.nombreingrediente}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-1">
                {habilitar ? (
                  <h6>Llena los campos del nuevo producto/ingrediente:</h6>
                ) : (
                  <h6>Edita los campos de {productname}:</h6>
                )}
              </div>

              <div className="mb-3 col-md-4 mt-2">
                <label htmlFor="exampleInputNuevoP1" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputNuevoP1"
                  aria-describedby="NameHelp"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />
                <div id="NameHelp" className="form-text">
                  {productnamevalid === "false" ? (
                    <p className="text-danger">Mínimo 4 carácteres, máximo 16, no caracteres especiales</p>
                  ) : (
                    <p>Bien</p>
                  )}
                </div>
              </div>

              <div className="mb-3 mt-3 col-md-4 offset-md-2">
                <label htmlFor="exampleInputCode1" className="form-label">
                  Código:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputCode1"
                  disabled={!habilitar}
                  aria-describedby="CodeHelp"
                  value={productcode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
                <div id="CodeHelp" className="form-text">
                  {productcodevalid === "false" ? (
                    <p className="text-danger">Mínimo 1 carácter. Solo letras y números</p>
                  ) : (
                    <p>Bien</p>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-4 col-12">
                <label htmlFor="exampleInputCosto1" className="form-label">
                  Costo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputCosto1"
                  aria-describedby="CostHelp"
                  value={productcost}
                  onChange={(e) => setProductcost(e.target.value)}
                />
                <div id="CostHelp" className="form-text">
                  {productcostvalid === "false" ? (
                    <p className="text-danger">Solo números, incluso con punto</p>
                  ) : (
                    <p>Cuanto te cuesta tu producto?</p>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-4 col-12 offset-md-2">
                <label htmlFor="exampleInputPrecio1" className="form-label">
                  Precio:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPrecio1"
                  aria-describedby="PrecioHelp"
                  value={productprice}
                  onChange={(e) => setProductprice(e.target.value)}
                />
                <div id="PrecioHelp" className="form-text">
                  {productpricevalid === "false" ? (
                    <p className="text-danger">Solo números, incluso con punto</p>
                  ) : (
                    <p>Cual es el precio que tú le quieres asignar</p>
                  )}
                </div>
              </div>

              <p className="mb-0 offset-md-2">Unidad:</p>
              <div className="form-floating col-md-4 align-self-center mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  value={productunidad}
                  onChange={(e) => setProductunidad(e.target.value)}
                >
                  <option value="1">Kg</option>
                  <option value="2">gramos</option>
                  <option value="3">Litros</option>
                  <option value="4">mililitros</option>
                  <option value="5">unidad</option>
                  <option value="6">-</option>
                </select>
              </div>

              <div className="mb-3 col-md-4 col-12 offset-md-2">
                <label htmlFor="exampleInputStock1" className="form-label">
                  Stock:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputStock1"
                  aria-describedby="StockHelp"
                  value={productstock}
                  onChange={(e) => setProductstock(e.target.value)}
                />
                <div id="StockHelp" className="form-text">
                  {productstockvalid === "false" ? (
                    <p className="text-danger">Solo números, incluso con punto</p>
                  ) : (
                    <p>Cantidad que ingresas del producto de acuerdo a la unidad</p>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-4 col-12">
                <label htmlFor="exampleInputStocknotif1" className="form-label">
                  Stock de notificación:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputnotif1"
                  aria-describedby="StockNHelp"
                  value={productstocknotif}
                  onChange={(e) => setProductstocknotif(e.target.value)}
                />
                <div id="StockNHelp" className="form-text">
                  {productstocknotifvalid === "false" ? (
                    <p className="text-danger">Solo números, incluso con punto</p>
                  ) : (
                    <p>En esta cantidad el sistema notificará bajo inventario</p>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-4 offset-md-2">
                <label htmlFor="exampleInputProveedor1" className="form-label">
                  Proveedor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputProveedor1"
                  aria-describedby="ProveeHelp"
                  value={productproveedor}
                  onChange={(e) => setProductproveedor(e.target.value)}
                />
                <div id="ProveeHelp" className="form-text">
                  {productprovidvalid === "false" ? (
                    <p className="text-danger"> Solo letras y numeros, no acentos</p>
                  ) : (<p>Bien</p>)}
                </div>
              </div>

              <div className="mb-3 col-md-4">
                <label htmlFor="exampleInputCategoria" className="form-label">
                  Categoria:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputCategoria"
                  aria-describedby="catehelp"
                  value={productcategoria}
                  onChange={(e) => setProductcategoria(e.target.value)}
                />
                <div id="catehelp" className="form-text">
                  {productcategovalid === "false" ? (
                    <p className="text-danger">Solo letras</p>
                  ) : (
                    <p>Bebida, comida rápida, tu elige la categoria!</p>
                  )}
                </div>
              </div>

              <div className="form-floating my-3  offset-md-1 col-md-5">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={productdescrip}
                  onChange={(e) => setProductdescrip(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">
                  Descripción del producto:
                </label>
              </div>

                <div className="col-md-4 col-12">
                  <img
                    src={ (imagebinary===null) ? imgavailable : imagebinary}
                    className="img-thumbnail"
                    id="showimg1"
                  />
                  <label className="form-check-label text-secondary" htmlFor="showimg1">
                    Si agregaste una imagen a tu producto, aquí se mostrará
                  </label>
                </div>
                <div className="col-md-5 offset-md-1 col-12">
                  <input type="file" className="form-control" id="file" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)} />
                  <label className="form-label text-secondary" htmlFor="file">
                    {
                      (productimagenvalid==='false') ?
                       <p className="text-danger">Inserta imagenes, no archivos</p>
                       : (productimagenvalid==='true') ?
                       <p>Bien</p>
                       : <p>Agrega una imagen para tu producto</p>
                    }
                  </label>
                </div>

              <div className="col-11 d-flex justify-content-center my-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck2"
                    onChange={handleChangeChIng}
                    checked={habilitaring}
                    disabled={!habilitar}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Se agrega como ingrediente???
                  </label>
                </div>

              <div className="d-flex justify-content-center">
                <div className="mx-2 my-4">
                  <button
                    type="submit"
                    className="btn btn-info"
                    disabled={blockbutton}
                    onMouseOver={validacion}
                    onClick={ !habilitaring ? handleSubmitInsertion1 : handleSubmitInsertion2}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
}

export default AgregarInventario