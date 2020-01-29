import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function TextCard() {
    const [text, setText] = useState("");
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Meio Ambiente
                </Typography>
                <Typography variant="h5" component="h2">
                    Em pleno século XXI é salutar refletir sobre a importância de preservação do meio ambiente bem como atuar em prol de uma sociedade mais consciente e limpa.
                    Já ficou mais que claro que a maioria dos problemas os quais enfrentamos atualmente nas grandes cidades, foram gerados pela ação humana.
                    De tal modo, podemos pensar nas grandes construções, alicerçadas na urbanização desenfreada, ou no simples ato de jogar lixo nas ruas.
                    A poluição gerada e impregnada nas grandes cidades foi em grande parte fruto da urbanização desenfreada ou da atuação de indústrias; porém, deveres não cumpridos pelos homens também proporcionaram toda essa "sujidade". Nesse sentido, vale lembrar que pequenos atos podem produzir grandes mudanças se realizados por todos os cidadãos.
                    Portanto, um conselho deveras importante: ao invés de jogar o lixo (seja um papelzinho de bala, ou uma anotação de um telefone) nas ruas, guarde-o no bolso e atire somente quando encontrar uma lixeira. Seja um cidadão consciente! Não Jogue lixo nas ruas!
                    Em pleno século XXI é salutar refletir sobre a importância de preservação do meio ambiente bem como atuar em prol de uma sociedade mais consciente e limpa.
                    Já ficou mais que claro que a maioria dos problemas os quais enfrentamos atualmente nas grandes cidades, foram gerados pela ação humana.
                    De tal modo, podemos pensar nas grandes construções, alicerçadas na urbanização desenfreada, ou no simples ato de jogar lixo nas ruas.
                    A poluição gerada e impregnada nas grandes cidades foi em grande parte fruto da urbanização desenfreada ou da atuação de indústrias; porém, deveres não cumpridos pelos homens também proporcionaram toda essa "sujidade". Nesse sentido, vale lembrar que pequenos atos podem produzir grandes mudanças se realizados por todos os cidadãos.
                    Portanto, um conselho deveras importante: ao invés de jogar o lixo (seja um papelzinho de bala, ou uma anotação de um telefone) nas ruas, guarde-o no bolso e atire somente quando encontrar uma lixeira. Seja um cidadão consciente! Não Jogue lixo nas ruas!
                </Typography>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles({
    card: {
      maxWidth: 750,
      marginTop: 25,
    },
    title: {
      fontSize: 25,
      textAlign: "center",
    },
});

export default TextCard;