import React, { useState, useEffect } from 'react';

import './style.css';

import api from '../../services/apiText';

import Contador from '../../components/Contador/index';

function MainContent() {
    const [textUser, setTextUser] = useState("");

    const randomApi = async () => {
        const resp = await api.get('/lorem/p-1/1-650');
        const text = resp.data.text_out;
        if(seconds === 0 && minutes === 0) {
            setTextUser(text.replace('<p>' , '').replace('</p>' , ''));
        }
    }

    function switchText() {
        const warning = document.getElementById('section-warning');
        if(seconds === 0 && minutes === 0) {
            randomApi();
        } else {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: Não é possivel alterar o texto durante o teste</span></div>"
        }
    }

    function apiOneReload() {
        randomApi();
    }
    
    window.addEventListener('load', apiOneReload);

    var arrayPalavras = textUser.split(' ');

    const [isOn, setIsOn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [ppm, setPpm] = useState(0);
    const [statusPpm, setStatusPpm] = useState({
        status: '',
        desc: '',
    });
    
    function viraAmpulheta() {
        if(isOn === true && arrayPalavras.length > 200) {
            document.getElementById('hourglass-icon').classList.add('animationAmpulheta');
        } else {
            document.getElementById('hourglass-icon').classList.remove('animationAmpulheta');
        }
    }

    useEffect(viraAmpulheta, [isOn]);

    function incrementTime() {
        const warning = document.getElementById('section-warning');
        if(isOn === true && arrayPalavras.length > 200 && seconds < 59) {
            setSeconds(seconds + 1);
        } else if(isOn === true && arrayPalavras.length < 300) {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O texto deve ter no mínimo 300 palavras</span></div>"
            // Update
            setIsOn(false);
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
        if (seconds !== 0 && arrayPalavras.length > 200) {
            setIsOn(false);
            const test = document.getElementById("contentBefore");
            test.classList.add('closedTime');
            setTimeout(() => {
                test.style.display = "none";
            } , 1000);
            const after = document.getElementById("contentAfter");
            after.style.display = "flex";
            // Calcular ppm
                const palavras = textUser.split(" ");
                const tempo = minutes + (seconds/60);
                setPpm(palavras.length/tempo);
            // Level of the ppm
                // https://renatoalves.com.br/blog/qual-e-a-velocidade-de-leitura-ideal-descubra-agora/
                // 50 ruim 
                // 150 bom 
                // 600 excelente

            warning.innerHTML += " ";
        } 
        else if(textUser.length < 200){
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O texto deve ter no mínimo 300 palavras</span></div>"
        } 
        else if(seconds === 0) {
            warning.innerHTML = "<div class='warning-item'><div class='cube-color'></div><span>Aviso: O contador deve ser inicializado!</span></div>"
        }
    }

    function validationText(e) {
        setTextUser(e.target.value);
        if (textUser.length > 200) {
            e.target.style.borderColor = "#5bcc35";
        } else {
            e.target.style.borderColor = "rgb(216, 106, 42)";
        }
    }

    useEffect( () => {
        if(ppm <= 50) {
            setStatusPpm({
                status: 'Recêm alfabetizado',
                imageStatus: "health-reading health-color-red fas fa-sad-tear",
                desc: 'Esse é o nível de leitores recem alfabetizados, caso você não seja precisas melhorar em sua velocidade de leitura!',
            })
        } else if(ppm > 50 && ppm <= 150) {
            setStatusPpm({
                status: 'Bom',
                imageStatus: "health-reading health-color fas fa-smile-beam",
                desc: 'Esse é o nível dentro do padrão global de leitores, você é um intermediario.'
            })
        } else if(ppm > 150 && ppm <= 600) {
            setStatusPpm({
                status: 'Excelente',
                imageStatus: "health-reading health-color fas fa-laugh-beam",
                desc: 'Você esta na categoria dos leitores dinâmicos, ou seja, estudantes e profissionais que conseguem obter alta performance nas atividades que exigem leitura.'
            })
        } else {
            setStatusPpm({
                status: 'Sobrenatural',
                imageStatus: "health-reading health-color fas fa-laugh-beam",
                desc: 'Que isso?! Tudo isso? Parabéns',
            })
        }
    }, [ppm]);

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
                        }} className="btn-inicio btn-pool">Iniciar contagem</button>
                        <button onClick={() => {
                            pauseTime();
                        }} className="btn-pause btn-pool">Finalizar</button>
                        <button onClick={() => {
                            switchText();
                        }} className="btn-switch-text btn-pool">Trocar texto</button>
                    </div>
                    <span id="error-msg"></span>
                </div>
            </div>  
            <div id="contentAfter">
                <i className={statusPpm.imageStatus}></i>
                    <h4 className="health-title">Parabéns sua velocidade de leitura é: <span>{statusPpm.status}</span>!</h4>
                <span className="desc">
                    {statusPpm.desc}<br />
                    Quer saber mais sobre leitura orgânica e melhorar suas skills de
                    produtividade em leitura?
                </span>
                <div className="central-button">
                    <a className="btn-acesso" href="https://www.leituraorganica.com.br/">Saber mais agora</a>
                    <a className="btn-acesso remake-btn" href="/">Refazer teste</a>
                </div>
            </div>
        </>
    );
}


export default MainContent;