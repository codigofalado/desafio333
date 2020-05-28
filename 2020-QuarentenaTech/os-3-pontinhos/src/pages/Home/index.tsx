import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Tetris 333</h1>

      <nav>
        <ul>
          <li>
            <Link to="/play">Jogar</Link>
          </li>
          <li>
            <Link to="/config">Configurações</Link>
          </li>
          <li>
            <Link to="/ajuda">Ajuda</Link>
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
    </Container>
  );
};

export default Home;
