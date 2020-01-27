import React , { useState, useEffect } from 'react';

import './style.css';

function Contador(prop) {

    const [displayMin, setDisplayMin] = useState("");
    const [displaySec, setDisplaySec] = useState("");

    function condition() {
        if(prop.min < 10) {
            setDisplayMin("0"+prop.min);
        } else {
            setDisplayMin(prop.min);
        }
        if(prop.seg < 10) {
            setDisplaySec("0"+prop.seg);
        } else {
            setDisplaySec(prop.seg);
        }
    }

    useEffect(condition, [prop])

    return (
        <div className="boxCont">
            <i className="fas fa-hourglass-half hourglass-icon"></i>
            <span id="hour-txt" className="hour-text">
                <input 
                    type="text"
                    disabled 
                    className="inputHour" 
                    id="min" 
                    value={displayMin} 
                />
                <span className="separa">:</span>
                <input 
                    type="text"
                    disabled 
                    className="inputHour" 
                    id="seg" 
                    value={displaySec} 
                />
            </span>
        </div>
    );
}

export default Contador;