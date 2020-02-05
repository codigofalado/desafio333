import React from "react";

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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                <DialogContentText>Parabéns, seu PPM é: 192 PPM</DialogContentText>
                <div className="buttons-options">
                    <Button onClick={onClosed} color="primary">
                        Refazer
                    </Button>
                    <ButtonsShare />
                </div>
                </DialogContent>
        </Dialog>
    );

}

export default ResultDialog;