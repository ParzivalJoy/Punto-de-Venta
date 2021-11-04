import React from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function Header(props) {

    function AgregarCliente(){
    }

    return (
        <div className="sales-header-container">
            <div className="header-left">
                <span className="client-title">Atiende a Cliente! <AddCircleOutlineIcon className="header-icons"/></span>
                <span className="client.promo">Tiene 5 promociones disponibles <MoreHorizIcon className="header-icons"/></span>       
            </div>
            <div className="header-rigjh">
                <LocalGroceryStoreIcon/>
            </div>   
        </div>

        
    )
}
