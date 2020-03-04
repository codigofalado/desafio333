import React from 'react';

import { 
  TwitterShareButton, 
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

import './index.css';

export default function ButtonsShare({ ppm }) {
  return (
    <div className="buttons-share">
        <TwitterShareButton 
            url=" https://twitter.com/share"
            title={`Minha velocidade de leitura é: ${ppm.toFixed(2)} PPM. Quer saber qual a sua, então acesse: https://elated-leakey-32905a.netlify.com/`}
        >
            <TwitterIcon className="icon-button" size={34} />
        </TwitterShareButton>

        <FacebookShareButton
          url="https://facebook.com/share"
          quote={`Minha velocidade de leitura é: ${ppm.toFixed(2)} PPM. Quer saber qual a sua, então acesse: https://elated-leakey-32905a.netlify.com/`}
        >
          <FacebookIcon className="icon-button" size={34} />
        </FacebookShareButton>
    </div>
  );
}
