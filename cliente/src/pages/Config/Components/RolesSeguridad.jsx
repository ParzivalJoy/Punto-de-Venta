import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function RolesSeguridad() {

    const[desplegarsecc, setDesplegarsecc]= useState(false)
    const [listemployees, setListemployees]= useState([])
    const [permisoempleados, setPermisoempleados]= useState('')
    const [permisoinventarios, setPermisoinventarios]= useState(false)
    const [permisoconfiguracion, setPermisoconfiguracion]= useState(false)
    const [permisogestor, setPermisogestor]= useState(false)
    const [permisoproductos, setPermisoproductos]= useState(false)
    const [permisoventas, setPermisoventas]= useState(false)
    const[permisocontabilidad, setPermisocontabilidad]= useState(false)
    const[idusuario, setIdusuario]= useState(null)
    const [loading, setLoading]=useState(false)

    const DatosInicio= async()=>{
      const res2 = await fetch(
        `http://localhost:5000/configuracion/getEmpleados`
      );
      const data2 = await res2.json();
      setListemployees(data2)
    }

    const cleanstates=()=>{
      setPermisoconfiguracion(false)
      setPermisoempleados(false)
      setPermisogestor(false)
      setPermisocontabilidad(false)
      setPermisoproductos(false)
      setPermisoventas(false)
      setPermisoinventarios(false)
    }

    function informacionseccion(){
      Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }

    const bringPermisos=async(actualempleado)=>{
        if(actualempleado===''){
          Swal.fire('Atención!','no tienes empleados aún!', 'info')
        }
        else{

          const res3 = await fetch(
            `http://localhost:5000/configuracion/getIdusuario/${actualempleado}`
          );
          const data3 = await res3.json();
          let userid= data3.idusuario;
          setIdusuario(data3.idusuario)
          const res4 = await fetch(
            `http://localhost:5000/configuracion/getPermisos/${userid}`
          );
          const data4 = await res4.json();
          data4.map((permiso)=>{
            if(permiso.idpermiso===1){
              setPermisoempleados(permiso.acceso)
            }
            if(permiso.idpermiso===2){
              setPermisoinventarios(permiso.acceso)
            }
            if(permiso.idpermiso===3){
              setPermisoconfiguracion(permiso.acceso)
            }
            if(permiso.idpermiso===4){
              setPermisogestor(permiso.acceso)
            }
            if(permiso.idpermiso===5){
              setPermisoproductos(permiso.acceso)
            }
            if(permiso.idpermiso===6){
              setPermisoventas(permiso.acceso)
            }
            if(permiso.idpermiso===7){
              setPermisocontabilidad(permiso.acceso)
            }
          })

        }
    }

    const handlePermisos= async(e)=>{
        e.preventDefault();

        if(permisoempleados!==''){

          setLoading(true)
          const res = await fetch(
            `http://localhost:5000/configuracion/editPermisoEmpleados`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisoempleados
              }),
            }
          );
            await res.json();
          ////////editar permiso de inventarios//////////////////
          const resinv = await fetch(
            `http://localhost:5000/configuracion/editPermisoInventarios`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisoinventarios
              }),
            }
          );
            await resinv.json();
          ///////////editar permiso de configuracion//////////////////
          const rescon = await fetch(
            `http://localhost:5000/configuracion/editPermisoConfiguracion`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisoconfiguracion
              }),
            }
          );
            await rescon.json();
          /////////////////editar permisos de gestor //////////////////
          const resges = await fetch(
            `http://localhost:5000/configuracion/editPermisoGestor`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisogestor
              }),
            }
          );
            await resges.json();
          /////////////editar permisos de productos///////////////////
          const respro = await fetch(
            `http://localhost:5000/configuracion/editPermisoProductos`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisoproductos
              }),
            }
          );
            await respro.json();
          ////////////editar permisos de ventas//////////////////
          const resven = await fetch(
            `http://localhost:5000/configuracion/editPermisoVentas`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisoventas
              }),
            }
          );
            await resven.json();
          //////////editar permisos de contabilidad//////////////
          const resconta = await fetch(
            `http://localhost:5000/configuracion/editPermisoContabilidad`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idusuario,
                permisocontabilidad
              }),
            }
          );
            await resconta.json();
            Swal.fire('Bien!','Permisos actualizados!', 'success')
            cleanstates()
            setLoading(false)
        }else{
            Swal.fire('Error!','selecciona un empleado primero!', 'error')
        }
    }

    useEffect(()=>{
      DatosInicio()
    },[])

    return (
      <div className="row d-flex justify-content-center">
        {
          loading===true ? 
          (
            <div
            className="d-flex justify-content-center align-items-center"
            id="cargascreen"
          >
            <div>
              <PacmanLoader size={30} color={"#123adc"} loading={loading} />
            </div>
          </div>
          )
        :
        <div className="card col-md-11 m-4">
          <h3 className="config-title" onClick={() => setDesplegarsecc(!desplegarsecc)}>
            {desplegarsecc === false
              ? "+ Click aquí para definir la seguridad del POS"
              : "- Click para cerrar esta sección"}
          </h3>
          {desplegarsecc === true ? (
            <div>
              <form className="row d-flex justify-content-around">
                <div className="card col-12 m-2 ">
                  <h6>Selecciona un empleado</h6>
                </div>
                <div className="col-6 m-2">
                  <p className="mb-0">Empleados:</p>
                  <select
                    className="form-select"
                    aria-label="Floating label select example"
                    onClick={(e)=>bringPermisos(e.target.value)}
                  >
                    {
                      listemployees.map((employee,index) => (
                        <option
                          value={employee.idempleado}
                          key={index}
                        >
                          {employee.nombreempleado}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="card col-12 m-2">
                  <h6>
                    Selecciona los módulos a los que tiene acceso Laporte
                  </h6>
                  <HelpOutlineIcon className="icons" onclick={informacionseccion.bind(this)}/>
                </div>
                <div className="card m-2 col-5">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisoempleados}
                      onChange={(e)=>setPermisoempleados(e.target.checked)}
                      id="checkEmp"
                      checked={permisoempleados}
                    />
                    <label className="form-check-label" htmlFor="checkEmp">
                      Empleados
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisoconfiguracion}
                      onChange={(e)=>setPermisoconfiguracion(e.target.checked)}
                      checked={permisoconfiguracion}
                      id="checkConf"
                    />
                    <label className="form-check-label" htmlFor="checkConf">
                      Configuración
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisoproductos}
                      onChange={(e)=>setPermisoproductos(e.target.checked)}
                      id="checkProd"
                      checked={permisoproductos}
                    />
                    <label className="form-check-label" htmlFor="checkProd">
                      Productos
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisocontabilidad}
                      onChange={(e)=>setPermisocontabilidad(e.target.checked)}
                      id="checkCont"
                      checked={permisocontabilidad}
                    />
                    <label className="form-check-label" htmlFor="checkCont">
                      Contabilidad
                    </label>
                  </div>
                </div>
                <div className="card m-2 col-5">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisoinventarios}
                      onChange={(e)=>setPermisoinventarios(e.target.checked)}
                      id="checkInv"
                      checked={permisoinventarios}
                    />
                    <label className="form-check-label" htmlFor="checkInv">
                      Inventarios
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisogestor}
                      onChange={(e)=>setPermisogestor(e.target.checked)}
                      id="checkGDC"
                      checked={permisogestor}
                    />
                    <label className="form-check-label" htmlFor="checkGDC">
                      Gestor de campañas
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permisoventas}
                      onChange={(e)=>setPermisoventas(e.target.checked)}
                      id="checkVen"
                      checked={permisoventas}
                    />
                    <label className="form-check-label" htmlFor="checkVen">
                      Ventas
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit" onClick={handlePermisos}>
                  Guardar
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p>
                Aqui puedes definir el acceso que cada empleado tiene al POS!
              </p>
            </div>
          )}
        </div>
      }
      </div>
    );
}

export default RolesSeguridad