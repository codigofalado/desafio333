import React from "react";

import './index.css';
import Logo from "../../assets/Logo.png";

function Header() {
    return (
        <div className="div-header">
            <div className="div-logo">
                <a href="https://www.leituraorganica.com.br/" target="_blank" >
                    <img src={"https://github.com/codigofalado/desafio333/blob/master/2020-Janeiro-Leitura-Organica/assets/logos/Logo%20-%20Azul.png?raw=true"} />
                </a>
            </div>

            <div className="div-buttons">
                <a className="btn sobre" href="#div-info">Sobre</a>
                <a className="btn ppm" href="#div-ppm">Calcular PPM</a>
            </div>
        </div>
    );
}

export default Header;