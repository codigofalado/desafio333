import React, { useState } from "react";

import { EmailIcon } from "react-share";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ButtonsShare from "../ButtonsShare";

import './index.css';

function ResultDialog({ onClosed, open, numberWordsText, minutes, seconds, resultPPM }) {
    const [email, setEmail] = useState('');
    const [ppm, setPpm] = useState(resultPPM);
    const [isEmailSending, setIsEmailSending] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleSubmit = async e => {
        e.preventDefault();

        setIsEmailSending(true);
        if (!email) {
            alert("Email deve ser preenchido!");
        } else {
            const template_params = {
                "reply_to": email,
                "ppm": ppm.toFixed(2)
            }
            const service_id = "default_service";
            const template_id = "template_C6TCwMoL";
    
            await window.emailjs.send(service_id, template_id, template_params);

            alert("Email enviado com sucesso!");

            setEmail('');
        }

        setIsEmailSending(false);
    }

    const handleInputChange = e => {
        const email = e.target.value;
        setEmail(email);
    }

    return (
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClosed}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Resultado do seu teste"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Você leu um texto com {numberWordsText} palavras em {minutes} minuto(s) e {seconds} segundos.<br />
                    O valor do seu PPM é: <strong id="value-ppm">{ppm.toFixed(2)}</strong>
                </DialogContentText>
                <div className="buttons-options">
                    <Button title="Refazer" onClick={onClosed} id="btn" >
                        Refazer
                    </Button>
                    <ButtonsShare ppm={ppm} />

                    <form className="div-form" onSubmit={handleSubmit}>
                        <input
                            className="input-email"
                            type="email" 
                            placeholder="Compartilhar no seu email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <Button title="Enviar email" type="submit" id="btn">
                            { isEmailSending ? <CircularProgress size={24} /> : <div className="btn-email">
                                <EmailIcon className="icon-button" size={34} round />
                                <span>
                                    Enviar para o e-mail
                                </span>
                            </div>
                            }
                        </Button>
                    </form>
                </div>
                </DialogContent>
        </Dialog>
    );

}

export default ResultDialog;