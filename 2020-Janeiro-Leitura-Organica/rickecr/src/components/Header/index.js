import React from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './index.css';

function Header() {
    return (
        <div className="div-header">
            <div className="div-logo">
                <a href="https://www.leituraorganica.com.br/" target="_blank" rel="noopener noreferrer">
                    <img src={"https://raw.githubusercontent.com/codigofalado/desafio333/master/2020-Janeiro-Leitura-Organica/assets/logos/Logo%20-%20Preta.png"} alt="logo de leitura orgânica" />
                </a>
            </div>

            <div className="div-buttons">
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button href="#div-info">
                        <span>Sobre</span>
                    </Button>
                    <Button href="#div-ppm">
                        <span>Calcular PPM</span>
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default Header;