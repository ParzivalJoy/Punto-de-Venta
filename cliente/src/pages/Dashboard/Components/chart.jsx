import React, { useState, useCallback } from 'react';
import { Calendar } from '@natscale/react-calendar';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../../styles.scss';



export default function Chart({title, data, dataKey, grid}) {
    
    const [value, setValue] = useState();

    const onChange = useCallback(
        (value) => {
          setValue(value);
        },
        [setValue],
      );

    return (
    
        <div className="chart-section">
        <div className="calendar">
        <Calendar value={value} onChange={onChange} />
        </div>
        <div className="chart">
            <span className="chart-title">{title}</span>
            <ResponsiveContainer width="100%" aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey="month" stroke="#1d1b31"/>
                    <Line type="monotone" dataKey={dataKey}  stroke="#1d1b31"/>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#D1D5DB" strokeDasharray="5 5"/>}
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}
