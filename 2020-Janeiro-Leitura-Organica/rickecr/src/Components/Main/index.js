import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import TextCard from "../TextCard";
import ResultDialog from "../ResultDialog";

import './index.css';

function Main() {
    const [isTestInit, setIsTestInit] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setIsTestInit(false);
        setOpen(false);
    };

    const themeButton = createMuiTheme({
        palette: {
            primary: green,
        },
    });

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
                <ThemeProvider theme={themeButton}>
                    <Button href="#div-text" variant="contained" color="primary" onClick={() => setIsTestInit(true)}>Começar</Button>
                </ThemeProvider>
            </div>

            {isTestInit &&
                <div className="div-text" id="div-text">
                    <TextCard></TextCard>
                    <div className="div-btn">
                        <Button className="btn-result" variant="contained" color="secondary" onClick={() => {setOpen(true)}}>Terminei</Button>
                    </div>
                </div>
            }

            {open && <ResultDialog onClosed={handleClose} open={open} />}
        </div>
    );
}

export default Main;