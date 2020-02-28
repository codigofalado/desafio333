import React from 'react';

import { 
  TwitterShareButton, 
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

import './index.css';

export default function ButtonsShare() {
  return (
    <div className="buttons-share">
        <TwitterShareButton 
            url=" https://twitter.com/share"
            title="Minha velocidade de leitura é: 192 PPM"
        >
            <TwitterIcon className="icon-button" size={34} />
        </TwitterShareButton>

        <FacebookShareButton
          url="https://facebook.com/share"
          quote="Minha velocidade de leitura é: 192 PPM"
        >
          <FacebookIcon className="icon-button" size={34} />
        </FacebookShareButton>
    </div>
  );
}
