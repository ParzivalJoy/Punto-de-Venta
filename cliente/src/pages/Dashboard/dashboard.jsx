import React, {useState, useEffect} from 'react'
import Cards from './Components/cards'
import Chart from './Components/chart'
import '../../styles.scss';
import LeftTable from "./Components/lefttable"
import RightTable from "./Components/righttable"
import axios from 'axios'

export default function Dashboard() {

    const [enero, setEnero]= useState('')
    const [febrero, setFebrero] = useState('')
    const [marzo, setMarzo] = useState('')
    const [abril, setAbril] = useState('')
    const [mayo, setMayo] = useState('')
    const [junio, setJunio] = useState('')
    const [julio, setJulio] = useState('')
    const [agosto, setAgosto] = useState('')
    const [septiembre, setSeptiembre] = useState('')
    const [octubre, setOctubre] = useState('')
    const [noviembre, setNoviembre] = useState('')
    const [diciembre, setDiciembre] = useState('')

    async function getSalesEnero(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesEnero'+`/${year}`)
        setEnero(data.count)
    }

    async function getSalesFebrero(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesFebrero'+`/${year}`)
        setFebrero(data.count)
    }

    async function getSalesMarzo(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesMarzo'+`/${year}`)
        setMarzo(data.count)
    }

    async function getSalesAbril(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesAbril'+`/${year}`)
        setAbril(data.count)
    }

    async function getSalesMayo(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesMayo'+`/${year}`)
        setMayo(data.count)
    }

    async function getSalesJunio(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesJunio'+`/${year}`)
        setJunio(data.count)
    }
    
    async function getSalesJulio(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesJulio'+`/${year}`)
        setJulio(data.count)
    }

    async function getSalesAgosto(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesAgosto'+`/${year}`)
        setAgosto(data.count)
    }

    async function getSalesSeptiembre(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesSeptiembre'+`/${year}`)
        setSeptiembre(data.count)
    }

    async function getSalesOctubre(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesOctubre'+`/${year}`)
        setOctubre(data.count)
    }

    async function getSalesNoviembre(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesNoviembre'+`/${year}`)
        setNoviembre(data.count)
    }

    async function getSalesDiciembre(){
        let newDate = new Date()
        let year = newDate.getFullYear();
        const {data} = await axios.get('http://localhost:5000/api/dashboard/salesDiciembre'+`/${year}`)
        setDiciembre(data.count)
    }

    useEffect(() =>{
        getSalesEnero()
        getSalesFebrero()
        getSalesMarzo()
        getSalesAbril()
        getSalesMayo()
        getSalesJunio()
        getSalesJulio()
        getSalesAgosto()
        getSalesSeptiembre()
        getSalesOctubre()
        getSalesNoviembre()
        getSalesDiciembre()
    }, [])

    const userdata = [
        {
          month: 'Ene',
          sales: enero,
        },
        {
            month: 'Feb',
            sales: febrero,
        },
        {
            month: 'Mar',
            sales: marzo,
        },
        {
            month: 'Abr',
            sales: abril,
        },
        {
            month: 'May',
            sales: mayo,
        },
        {
            month: 'Jun',
            sales: junio,
        },
        {
            month: 'Jul',
            sales: julio,
        },
        {
            month: 'Ago',
            sales: agosto,
        },
        {
            month: 'Sep',
            sales: septiembre,
        },
        {
            month: 'Oct',
            sales: octubre,
        },
        {
            month: 'Nov',
            sales: noviembre,
        },
        {
            month: 'Dic',
            sales: diciembre,
        },
    
      ];

    return (
        <div className="dashboard">
            <Cards/>
            <Chart data={userdata} title="Gráfica de Ventas (Anual)" grid dataKey="sales"/>
            <div className="dash-tables">
                <LeftTable/>
                <RightTable/>
            </div>
        </div>
    )
}
