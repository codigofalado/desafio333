import React from "react";

import VelLeitura from "../VelLeitura";

import './index.css';

function Main() {
    return(
        <div className="div-main">
            <div className="div-info" id="div-info">
                <h1 className="title">Velocidade de leitura e sua importância</h1>
                <span className="text">A velocidade de leitura é uma medida quantitativa relativa ao tempo despendido na leitura de um texto ou de uma lista de palavras. A taxa de leitura (número de palavras lidas por minuto – p.p.m.) é dada pelo número de palavras lidas multpilicado por 60(segundos), dividido pelo total do tempo demorado para ler o texto completo. Essa velocidade de leitura pode dizer muito sobre sua leitura, pode te dizer quanto tempo você levará para ler um livro com determinadas páginas, um artigo e etc.</span>
            </div>

            <div className="div-ppm" id="div-ppm">
                <h1 className="title">Calcular o seu PPM</h1>
                <span className="text">Para iniciar o teste você deve clicar em “Começar”, então será mostrado um texto para você iniciar a leitura, após finalizar a leitura clique no botão “Terminei”. E será mostrado o seu resultado, permitindo que você compartilhar nas redes sociais, refazer o teste e/ou enviar para seu e-mail. Por favor, para que o teste seja feito corretamente você precisa ser sincero, leia o texto, sem pular nenhuma parte e com a velocidade que você iria ler normalmente.</span>
            </div>
            <VelLeitura />
        </div>
    );
}

export default Main;