import React from "react";

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

            <div className="div-btn">
                <button className="btn-result" onClick={() => {}}>Começar</button>
            </div>

            <div className="div-text" id="div-text">
                <h1 className="text">Text</h1>

                <text className="text">
                    Em pleno século XXI é salutar refletir sobre a importância de preservação do meio ambiente bem como atuar em prol de uma sociedade mais consciente e limpa.
                    Já ficou mais que claro que a maioria dos problemas os quais enfrentamos atualmente nas grandes cidades, foram gerados pela ação humana.
                    De tal modo, podemos pensar nas grandes construções, alicerçadas na urbanização desenfreada, ou no simples ato de jogar lixo nas ruas.
                    A poluição gerada e impregnada nas grandes cidades foi em grande parte fruto da urbanização desenfreada ou da atuação de indústrias; porém, deveres não cumpridos pelos homens também proporcionaram toda essa "sujidade". Nesse sentido, vale lembrar que pequenos atos podem produzir grandes mudanças se realizados por todos os cidadãos.
                    Portanto, um conselho deveras importante: ao invés de jogar o lixo (seja um papelzinho de bala, ou uma anotação de um telefone) nas ruas, guarde-o no bolso e atire somente quando encontrar uma lixeira. Seja um cidadão consciente! Não Jogue lixo nas ruas!
                </text>

                <div className="div-btn">
                    <button className="btn-result" onClick={() => {}}>Terminei</button>
                </div>
            </div>
        </div>
    );
}

export default Main;