import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ButtonsShare from "../ButtonsShare";

import './index.css';

function ResultDialog({ onClosed, open }) {
    const [email, setEmail] = useState('');
    const [ppm, setPpm] = useState(195);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleSubmit = async e => {
        e.preventDefault();

        const template_params = {
            "reply_to": email,
            "ppm": ppm
        }
        const service_id = "default_service";
        const template_id = "template_C6TCwMoL";

        await window.emailjs.send(service_id, template_id, template_params);
    }

    const handleInputChange = e => {
        setEmail(e.target.value);
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
                <DialogContentText>{`Parabéns, seu PPM é: ${ppm} PPM`}</DialogContentText>
                <div className="buttons-options">
                    <Button onClick={onClosed} color="primary">
                        Refazer
                    </Button>
                    <ButtonsShare />

                    <form className="div-form" onSubmit={handleSubmit}>
                        <input
                            className="input-email"
                            type="email" 
                            placeholder="Compartilhar no seu email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
                </DialogContent>
        </Dialog>
    );

}

export default ResultDialog;