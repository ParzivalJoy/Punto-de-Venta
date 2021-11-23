import React, {useState, useEffect} from 'react'
import product from '../../../assets/products.png'
import axios from 'axios'


export default function Cuentas() {

    const rol = localStorage.getItem('rol')
    const [activocuentas, setActivoCuenta] = useState(false)
    const[imagebinary, setImagebinary] = useState(null)
    const[productimagenvalid, setImageproductvalid]= useState(null);
    const[formDataS, setFormdatas]= useState(null)
    const[todosvalidos, setTodosvalidos]= useState(null);

  async function guardar(){
    const obj = {imagebinary}
    if(formDataS!==null){
      const resImgs = await fetch(
        `http://localhost:5000/cuentas/manejoImgs/${rol}`,
        {
          method: "PUT",
          body: formDataS
        }
      );
      await resImgs.json();
    }
  } 

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

    return (
        <div className="row d-flex justify-content-center">
        <div className="card col-md-11 m-4">
          <h3 className="config-title" onClick={() => setActivoCuenta(!activocuentas)}>
            {activocuentas === true
              ? "- Click para cerrar esta sección"
              : "+ Click aquí para definir los datos de la cuenta del negocio"}
          </h3>
          {activocuentas === true ? (
            <div className="row">
                <div className="col-md-6">
                    <span>Datos de la cuenta del negocio</span>
                    <div className="row">
                      <div className="card mb-3 col-md-8 mt-2">
                        <label  className="form-label">Numero de cuenta</label>
                          <input type="text" className="form-control"/>
                        </div>
                        <div className="card mb-3 col-md-8 mt-2">
                        <label className="form-label">Titular de la cuenta</label>
                          <input type="text" className="form-control" />
                        </div>  
                        <div className="card mb-3 col-md-8 mt-2">
                        <label className="form-label">Clabe</label>
                          <input type="text" className="form-control"/>
                        </div>    
                      </div>  
                </div>
                <div className="col-md-6">
                    Datos de Mercado Pago
                    <div  className="col-md-9 mt-5" align="center">
                    <div  className="col-md mt-2 " align="center">
                        <img src={(imagebinary===null) ? '' : imagebinary} width="350" height="500" className="rounded" alt="imagen producto " align="center"/>
                    </div>
                        <div className="input-group">
                            <input type="file" className="form-control" id="file" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)}/>
                        </div>
                    </div>
                </div>
            </div>
          ) : (
            <div>
              <p>Aqui puedes escoger el tema que desees para el POS!</p>
            </div>
          )}
          <button className="btn btn-primary" onClick={guardar.bind(this)}>Guardar</button>
        </div>
      </div>
    )
}
