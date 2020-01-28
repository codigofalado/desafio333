import React, { useState, useEffect } from 'react';

import './style.css';

import api from '../../services/apiText';

import Contador from '../../components/Contador/index';

function MainContent() {
    const [textUser, setTextUser] = useState("");

    async function randomApi() {
        const resp = await api.get('/lorem/p-1/1-650');
        const text = resp.data.text_out;
        setTextUser(text.replace('<p>' , '').replace('</p>' , ''));
    }

    useEffect(() => {
        randomApi();
    } , [])

    const [isOn, setIsOn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [ppm, setPpm] = useState(0);

    function viraAmpulheta() {
        if(isOn === true && textUser.length > 300) {
            document.getElementById('hourglass-icon').classList.add('animationAmpulheta');
        } else {
            document.getElementById('hourglass-icon').classList.remove('animationAmpulheta');
        }
    }

    useEffect(viraAmpulheta, [isOn]);

    function incrementTime() {
        const warning = document.getElementById('section-warning');
        warning.innerHTML = " ";
        if(isOn === true && textUser.length > 300 && seconds < 59) {
            setSeconds(seconds + 1);
        } else if(isOn === true && textUser.length < 300) {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O texto deve ter no mínimo 300 caracteres</span></div>"
        }
        if(seconds === 59) {
            setSeconds(0);
            incrementMinute();
        }
    }

    function incrementMinute() {
        if( seconds === 59) {
            setMinutes(minutes + 1);
        }
    }

    setTimeout(incrementTime, 1000);

    function pauseTime(e) {
        const warning = document.getElementById('section-warning');
        if (seconds !== 0 && textUser.length > 300) {
            setIsOn(false);
            const test = document.getElementById("contentBefore");
            test.classList.add('closedTime');
            const after = document.getElementById("contentAfter");
            after.style.display = "flex";
            // Calcular ppm
                const palavras = textUser.split(" ");
                const tempo = minutes + (seconds/60);
                setPpm(palavras.length/tempo);
            warning.innerHTML += " ";
        } 
        else if(textUser.length < 300){
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O texto deve ter no mínimo 300 caracteres</span></div>"
        } 
        else if(seconds === 0) {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O contador deve ser inicializado!</span></div>"
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
                <h2 className="block-title" >Você ja leu hoje? Teste sua velocidade de leitura.</h2>
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
                <i className="fas fa-smile-beam health-reading health-color"></i>
                    <h4 className="health-title">Parabéns sua velocidade de leitura é: <span className="health-color">{ppm.toFixed(2)}</span>!</h4>
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