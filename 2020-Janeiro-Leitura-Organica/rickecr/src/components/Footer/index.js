import React from 'react';

import logo from '../../static/Logo - Preta.png'

import './index.css';

export default function Footer() {
  return (
    <div className="div-footer">
      <div className="footer-left">
        <img src={logo} alt="logo-leitura-organica" />
      </div>
      <div className="footer-right">
        <span>Desenvolvido por <a href='https://github.com/Rickecr' target="_blank" rel="noopener noreferrer">@Rickecr</a></span>
      </div>
    </div>
  );
}
