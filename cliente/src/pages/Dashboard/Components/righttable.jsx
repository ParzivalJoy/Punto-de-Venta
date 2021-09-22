import React from 'react'
import '../../../styles.scss';
import FastfoodIcon from '@material-ui/icons/Fastfood';

export default function righttable() {
    
    const Button = ({type}) =>{
        return <button className={"table-button "+ type}>{type}</button>
    }

    return (
        <div className="right-table">
            <span className="right-title">Transacciones recientes</span>
            <table className="r-table">
                <tr className="right-tr">
                    <th className="right-th-user">Cliente</th>
                    <th className="right-th-date">Fecha</th>
                    <th className="right-th-total">Total</th>
                    <th className="right-th-type">Tipo de pago</th>
                </tr>
                <tr className="right-tr">
                    <td className="right-td-user">
                        <FastfoodIcon className="food-icon"/>
                        <span className="td-username">Robbie Hedfors</span>
                    </td>
                    <td className="td-date">09/09/2021</td>
                    <td className="td-total">$2500.00</td>
                    <td className="td-type"><Button type="Efectivo"/></td>
                </tr>
                <tr className="right-tr">
                    <td className="right-td-user">
                        <FastfoodIcon className="food-icon"/>
                        <span className="td-username">Robbie Hedfors</span>
                    </td>
                    <td className="td-date">09/09/2021</td>
                    <td className="td-total">$2500.00</td>
                    <td className="td-type"><Button type="Tarjeta"/></td>
                </tr>
                <tr className="right-tr">
                    <td className="right-td-user">
                        <FastfoodIcon className="food-icon"/>
                        <span className="td-username">Robbie Hedfors</span>
                    </td>
                    <td className="td-date">09/09/2021</td>
                    <td className="td-total">$2500.00</td>
                    <td className="td-type"><Button type="Efectivo"/></td>
                </tr>
            </table>
        </div>
    )
}
