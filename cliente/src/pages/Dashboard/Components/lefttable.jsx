import React from 'react'
import '../../../styles.scss';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function lefttable() {
    return (
        <div className="left-table">
            <span className="left-title">Nuevas afiliaciones</span>
            <ul className="left-list">
                <li className="left-list-item">
                    <AccountCircleIcon className="user-icon"/>
                    <div className="list-item-user">
                        <span className="item-username">Robbie Hedfors</span>
                        <span className="item-user-date">06/09/2021</span>
                    </div>
                    <button className="left-list-button">
                        <VisibilityIcon className="visible-icon"/>
                        Ver
                    </button>
                </li>
                <li className="left-list-item">
                    <AccountCircleIcon className="user-icon"/>
                    <div className="list-item-user">
                        <span className="item-username">Robbie Hedfors</span>
                        <span className="item-user-date">06/09/2021</span>
                    </div>
                    <button className="left-list-button">
                        <VisibilityIcon className="visible-icon"/>
                        Ver
                    </button>
                </li>
                <li className="left-list-item">
                    <AccountCircleIcon className="user-icon"/>
                    <div className="list-item-user">
                        <span className="item-username">Robbie Hedfors</span>
                        <span className="item-user-date">06/09/2021</span>
                    </div>
                    <button className="left-list-button">
                        <VisibilityIcon className="visible-icon"/>
                        Ver
                    </button>
                </li>
            </ul>
        </div>
    )
}
