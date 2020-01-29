import React from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './index.css';

function Header() {
    return (
        <div className="div-header">
            <div className="div-logo">
                <a href="https://www.leituraorganica.com.br/" target="_blank" rel="noopener noreferrer">
                    <img src={"https://github.com/codigofalado/desafio333/blob/master/2020-Janeiro-Leitura-Organica/assets/logos/Logo%20-%20Azul.png?raw=true"} alt="logo de leitura orgânica" />
                </a>
            </div>

            <div className="div-buttons">
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button href="#div-info">Sobre</Button>
                    <Button href="#div-ppm">Calcular PPM</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default Header;