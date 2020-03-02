import React, { useState } from "react";

import { EmailIcon } from "react-share";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ButtonsShare from "../ButtonsShare";

import './index.css';

function ResultDialog({ onClosed, open, resultPPM }) {
    const [email, setEmail] = useState('');
    const [ppm, setPpm] = useState(resultPPM);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleSubmit = async e => {
        e.preventDefault();

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
                <DialogContentText>{`Parabéns, seu PPM é: ${ppm.toFixed(2)} PPM`}</DialogContentText>
                <div className="buttons-options">
                    <button onClick={onClosed} id="btn">
                        Refazer
                    </button>
                    <ButtonsShare ppm={ppm} />

                    <form className="div-form" onSubmit={handleSubmit}>
                        <input
                            className="input-email"
                            type="email" 
                            placeholder="Compartilhar no seu email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <button type="submit" id="btn">
                            <EmailIcon className="icon-button" size={34} round />
                            <span>
                                Enviar para o e-mail
                            </span>
                        </button>
                    </form>
                </div>
                </DialogContent>
        </Dialog>
    );

}

export default ResultDialog;