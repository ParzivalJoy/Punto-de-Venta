import React, {useState, useEffect} from 'react'
import '../../../styles.scss';
import axios from 'axios'

export default function Righttable() {
    
    const Button = ({type}) =>{
        return <button className={"table-button "+ type}>{type}</button>
    }


    const [transacciones, setTransacciones] = useState([])

    function getCurrentDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }


    async function getTransactions(){
        let fecha=getCurrentDate()
        const {data} = await axios.get('http://localhost:5000/api/dashboard/transactions'+`/${fecha}`)
        setTransacciones(data)
    }

    useEffect(() =>{
        getTransactions()
    }, [])

    return (
        <div className="right-table">
            <span className="right-title">Transacciones recientes</span>
            <table className="r-table">
                <tr className="right-tr">
                    <th className="right-th-user">Id</th>
                    <th className="right-th-user">Usuario</th>
                    <th className="right-th-date">Fecha</th>
                    <th className="right-th-total">Total</th>
                    <th className="right-th-type">Tipo de pago</th>
                </tr>
                {transacciones.map(item =>(
                <tr className="right-tr">
                    <td><span className="td-username">{item.idusuario}</span></td>
                    <td className="right-td-user">
                        <span className="td-username">{item.usuario}</span>
                    </td>
                    <td className="td-date">{item.fechaventa}</td>
                    <td className="td-total">${item.totalventa}</td>
                    <td className="td-type"><Button type={item.tipopago}/></td>
                </tr>
                ))}
            </table>
        </div>
    )
}
