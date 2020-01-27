import React, { useState } from 'react';

import './style.css';

import Contador from '../../components/Contador/index';

function MainContent() {
    const [textUser, setTextUser] = useState("");

    const [isOn, setIsOn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    
    function viraAmpulheta() {
        const hourglass = document.getElementById('hourglass-icon');
        console.log(hourglass);
        
    }

    viraAmpulheta();

    function incrementTime() {
        const warning = document.getElementById('section-warning');
        warning.innerHTML = " ";
        if(isOn === true && seconds < 59) {
            setSeconds(seconds + 1);
        }
        if(seconds === 59) {
            setSeconds(0);
            incrementMinute();
        }
    }

    function incrementMinute() {
        if( seconds === 59) {
            setMinutes(minutes + 1);
            console.log(minutes);
        }
    }

    setTimeout(incrementTime, 100);

    function pauseTime(e) {
        const warning = document.getElementById('section-warning');
        if (seconds !== 0 ) {
            setIsOn(false);
            const test = document.getElementById("contentBefore");
            test.classList.add('closedTime');
            const after = document.getElementById("contentAfter");
            after.style.display = "flex";
            warning.innerHTML += " ";
        } else {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: Você deve inicializar a contagem para finalizar o teste</span></div>"
        }
    }

    function validationText(e) {
        setTextUser(e.target.value);
        if (textUser.length > 300) {
            e.target.style.borderColor = "#5bcc35";
        } else {
            e.target.style.borderColor = "rgb(216, 106, 42)";
        }
    }

    return (
        <>
            <div id="contentBefore" className="blockCode">
                <h2 className="block-title" >Digite o texto:</h2>
                <textarea 
                    spellCheck="false"
                    className="textWord"
                    value = {textUser}
                    onChange = {validationText}
                >
                </textarea>
                <div className="beforeTest">
                    <Contador seg={seconds} min={minutes} />
                    <div id="section-warning" className="section-warning">
                    </div>
                    <div className="btn-section">
                        <button onClick={() => {
                            setIsOn(true);
                        }} className="btn-inicio">Iniciar contagem</button>
                        <button onClick={pauseTime} className="btn-pause">Finalizar</button>
                    </div>
                    <span id="error-msg"></span>
                </div>
            </div>  
            <div id="contentAfter">
                <i id="hourglass-icon" className="fas fa-smile-beam health-reading health-color"></i>
                <h4 className="health-title">Parabéns sua velocidade de leitura é: <span className="health-color">Excelente</span>!</h4>
                <span className="desc">
                    Quer saber mais sobre leitura orgânica e melhorar suas skills de
                    produtividade em leitura?
                </span>
                <div className="central-button">
                    <a className="btn-acesso" href="https://www.leituraorganica.com.br/">Acessar agora</a>
                    <a className="btn-acesso remake-btn" href="/">Refazer teste</a>
                </div>
            </div>
        </>
    );
}


export default MainContent;