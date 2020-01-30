import React from "react";

import VelLeitura from "../VelLeitura";

import './index.css';

function Main() {
    return(
        <div className="div-main">
            <div className="div-info" id="div-info">
                <h1 className="title">Velocidade de leitura e sua importância</h1>
                <text className="text">A velocidade de leitura é uma medida quantitativa relativa ao tempo despendido na leitura de um texto ou de uma lista de palavras. A taxa de leitura (número de palavras lidas por minuto – p.p.m.) é dada pelo número de palavras lidas multpilicado por 60(segundos), dividido pelo total do tempo demorado para ler o texto completo. FALTA COLOCAR A IMPORTÂNCIA !!!</text>
            </div>

            <div className="div-ppm" id="div-ppm">
                <h1 className="title">Calcular o seu PPM</h1>
                <text className="text">Para iniciar o teste você deve clicar em “Começar”, então será mostrado um texto para você iniciar a leitura e após finalizar a leitura clique no botão abaixo “Terminei”. E será mostrado o seu resultado, podendo compartilhar nas redes sociais, refazer o teste e/ou enviar para seu e-mail. Por favor, para que o teste seja feito corretamente você precisa ser sincero, leia o texto, sem pular nenhuma parte e com a velocidade que você iria ler normalmente.</text>
            </div>
            <VelLeitura />
        </div>
    );
}

export default Main;