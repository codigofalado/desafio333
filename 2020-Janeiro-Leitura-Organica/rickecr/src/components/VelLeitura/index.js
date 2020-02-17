import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import TextCard from '../TextCard';
import ResultDialog from '../ResultDialog';

import './index.css';

export default function VelLeitura() {
	const [isTestInit, setIsTestInit] = useState(false);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setIsTestInit(false);
		setOpen(false);
	};

	return (
		<div className="div-text">
			<div className="div-btn">
					<Button id="btn" href="#div-text" onClick={() => setIsTestInit(true)}>
						Começar
					</Button>
				
				{/* <Button href="#div-text" onClick={() => setIsTestInit(true)}>
					<span>Começar</span>
				</Button> */}
			</div>

			{isTestInit &&
			<div id="div-text">
				<TextCard />
				<div className="div-btn">
					<button id="btn" onClick={() => {setOpen(true)}}>Terminei</button>
				</div>
			</div>
			}

			{open && <ResultDialog onClosed={handleClose} open={open} />}

		</div>
	);
}