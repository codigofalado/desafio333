import React, { useState, useEffect } from 'react';
import Marquee from 'react-marquee';

import './styles.scss';
import logo from '../../assets/logo-g1.svg';

export default function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setTimeout(() => {
      const timeNow = new Date().toLocaleTimeString();
      setTime(timeNow);
    }, 1000);
  }, [time]);

  return (
    <div className="footer-container">
      <h2>LAVA JATO NO RIO</h2>
      <h1>EIKE BATISTA VOLTA A SER PRESO PELA POLÍCIA FEDERAL</h1>
      <div className="footer-footer">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Marquee
          loop
          hoverToStop
          className="marquee"
          text="Últimas notícias de economia,
            política, carros, emprego, educação,
            ciência, saúde, cultura do Brasil
            e do mundo. | Modelo da Nec Corp
            parece mais um drone gigante e
            utiliza 4 hélices para sair do chão.
            Governo japonês que tornar carros
            voadores viáveis até 2030."
        />
        <span>{time}</span>
      </div>
    </div>
  );
}
