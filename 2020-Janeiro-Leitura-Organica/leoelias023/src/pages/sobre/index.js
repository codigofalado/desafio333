import React from 'react';

import './style.css';

function Sobre() {
    return (
        <>
        <div className="ondas"></div>
        <div className="sobre-full">
            <div id="sobre" className="sobre-margin">
                <h2 className="title-about">Você já parou para calcular a sua velocidade de leitura?</h2>
                <p>
                    Num mundo tão subjetivo quanto o da leitura, a velocidade de leitura é uma métrica objetiva que te permite saber como está a sua leitura nesse momento e te permite acompanhar a sua evolução!
                </p>
                <p>
                A medida mais utilizada para calcular a velocidade de leitura é Palavras por Minuto (PPM). Uma leitura em páginas por hora, por exemplo, não pode ser aplicada em qualquer livro (pois tem tamanhos diferentes de páginas), muito menos em artigos ou notícias.
                </p>
                <span>
                    Que tal descobrir agora a sua velocidade de leitura?
                </span>
                <div className="center-btn">
                    <a href="#contentBefore" className="btn-discover">Descobrir</a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Sobre;