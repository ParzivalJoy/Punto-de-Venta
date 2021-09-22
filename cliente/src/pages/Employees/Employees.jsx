import React from 'react'
import Card from './Components/Card'
import CardAdd from './Components/CardAdd'
import  { useEffect, useState } from 'react'
import axios from 'axios' //npm i axios
import '../../styles.scss'

const baseURL = process.env.REACT_APP_API_URL //npm i dotenv

function Employees() {
    const [ listEmployees, setListEmployees ] = useState([])
    const [ idempleado, setId ] = useState('')
    const [ nombreempleado, setName ] = useState('')
    const [ emailempleado, setEmail ] = useState('')
    const [ telempleado, setTel ] = useState('')
    const [ dirempleado, setDir ] = useState('')
    const [ update, setUpdate ] = useState(false)

    useEffect(() => {
        getEmployees()
    },[])

    async function getEmployees(){
        const { data } = await axios.get(baseURL)
        setListEmployees(data)
    }

    function getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    async function saveEmployee(){
         let fechacontra=getCurrentDate()
        const obj = { nombreempleado,fechacontra, emailempleado, telempleado,dirempleado }
        const { data } = await axios.post(baseURL, obj)
        console.log(data)
        clearInput()
        getEmployees()
    }

    function clearInput(){
        setName('')
        setEmail('')
        setTel('')
        setDir('')
    }

    async function deleteEmployee(idempleado){
        if(window.confirm('¿seguro que quieres eliminar?')){
        const { data } = await axios.delete(baseURL+`/${idempleado}`)
        console.log(data)
        getEmployees()
        }
    }

    async function getEmployee(idempleado){
        if(window.confirm('¿seguro que quieres actualizar?')){
        setUpdate(true)
        const {data} = await axios.get(baseURL+`/${idempleado}`)
        let nombre =  data.nombreempleado
        let email =  data.emailempleado
        let tel = data.telempleado
        let dir = data.dirempleado
        setId(idempleado)
        if (nombreempleado==='')
            setName(nombre)
        if (emailempleado==='')
            setEmail(email)
        if (telempleado==='')
            setTel(tel)
        if (dirempleado==='')
            setDir(dir)
        }
        else
            setUpdate(false)
    }

    async function updateEmployee(){
        const obj = {idempleado,nombreempleado, emailempleado, telempleado,dirempleado }
        const { data } = await axios.put(baseURL,obj)
        console.log(data)
        clearInput()
        getEmployees()
     }

    return (
        
        <div className="p-3 mb-2 bg-light text-dark" >
            <div className='row'>
                { listEmployees.map(item => (
                 <div className="col-md-3" key={item.idempleado}>
                        <Card
                        idempleado={item.idempleado}
                        nombreempleado={item.nombreempleado}
                        emailempleado={item.emailempleado}
                        telempleado={item.telempleado}
                        dirempleado={item.dirempleado}
                        fechacontra={item.fechacontra}
                        setName={setName}
                        setEmail={setEmail}
                        setTel={setTel}
                        setDir={setDir}
                        deleteEmployee={deleteEmployee}
                        getEmployee={getEmployee}
                        updateEmployee={updateEmployee}
                        update={update}
                        setUpdate={setUpdate}
                        />
                </div>
                ))}
                <div className='col-md-3'>
                    <CardAdd
                    nombreempleado={nombreempleado}
                    emailempleado={emailempleado}
                    telempleado={telempleado}
                    dirempleado={dirempleado}
                    setName={setName}
                    setEmail={setEmail}
                    setTel={setTel}
                    setDir={setDir}
                    saveEmployee={saveEmployee}
                    />
                </div>
            </div>
        </div>
    )
}

export default Employees