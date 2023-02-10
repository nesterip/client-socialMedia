import React from 'react';
import './TrendCard.css';
import {TrendData} from '../../Data/TrendData.js';

const TrendCard = () => {
    return (
        <div className="trendCard">
            <h3>Tendencias Locales</h3>
            {TrendData.map((trend, id) =>{
                return(
                    <div className="trend" key={id}>
                        <span>#{trend.name}</span>
                        <span>{trend.share}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default TrendCard