import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import * as S from './styles';

const Home: React.FC = () => {
  return (
    <S.Container>
      <h1>Tetris</h1>

      <nav>
        <ul>
          <li>
            <Link to="/play">Jogar</Link>
          </li>
          <li>
            <Link to="config">Configurações</Link>
          </li>
          <li>
            <Link to="rules">Ajuda</Link>
          </li>
        </ul>
      </nav>

      <footer>
        <a
          href="https://github.com/henry-ns/desafio333/tree/master/2020-QuarentenaTech/os-3-pontinhos"
          target="_black"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </footer>
    </S.Container>
  );
};

export default Home;
