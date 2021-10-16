import React from 'react'

export default function Carrito() {

    const theData = [
        {
            name: 'Sam',
            email: 'somewhere@gmail.com'
        },
    
        {
            name: 'Ash',
            email: 'something@gmail.com'
        }
    ]
    
    const temp = JSON.parse(localStorage['Datas'])
    console.log(theData)

    return (
        <div className="carrito">
            {temp.map(item => (
                <p>{item.id}</p>
            ))}
        </div>
    )
}
