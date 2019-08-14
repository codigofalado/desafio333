import React from 'react';

import './styles.scss';
import logo from '../../assets/logo-globo.svg';

export default function Header() {
  return (
    <div className="header-container">
      <span>#GNewsEmPonto</span>
      <div className="info-program">
        <img src={logo} alt="" />
        <div className="alert">URGENTE</div>
        <span>NEWS</span>
      </div>
    </div>
  );
}
