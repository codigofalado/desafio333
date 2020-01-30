import React, { useState } from 'react';

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
				<a href="#div-text">
					<button className="btn" onClick={() => setIsTestInit(true)}>Começar</button>
				</a>
			</div>

			{isTestInit &&
			<div id="div-text">
				<TextCard/>
				<div className="div-btn">
					<button className="btn" onClick={() => {setOpen(true)}}>Terminei</button>
				</div>
			</div>
			}

			{open && <ResultDialog onClosed={handleClose} open={open} />}

		</div>
  	);
}