import React from "react";

import './index.css';

function Header() {
    return (
        <div className="div-header">
            <a href="https://www.leituraorganica.com.br/" target="_blank" rel="noopener noreferrer">
                <img src={"https://raw.githubusercontent.com/codigofalado/desafio333/master/2020-Janeiro-Leitura-Organica/assets/logos/leitura-organica-logo.png"} alt="logo de leitura orgânica" />
            </a>
        </div>
    );
}

export default Header;