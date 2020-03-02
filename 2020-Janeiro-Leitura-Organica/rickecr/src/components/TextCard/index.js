import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TextGenerator from "../../services/TextGenerator";

function TextCard({ onNumberOfWordsInText }) {
	const [text, setText] = useState('');
	const classes = useStyles();

	useEffect(() => {
		const text_gerado = TextGenerator.lerolero(25)
		setText(text_gerado);

		onNumberOfWordsInText(numberOfWords(text_gerado))
	},
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	[])

	const numberOfWords = (text) => {
		let amount = 0;
		text.split(" ").map(word => {
			const char = word.split();
			if (!(char.includes(['?', '!', '.', ',', '-', ':', ';', '~', "´", '`', ']', '[', '(', ')', '{', '}', '&', '$', '@']))) {
				amount += 1;
			}
		});

		return amount;
	}

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Meio Ambiente
				</Typography>
				<Typography variant="h5" component="h2">
					{ text }
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