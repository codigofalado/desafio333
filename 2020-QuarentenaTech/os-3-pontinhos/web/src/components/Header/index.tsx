import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <h1>Tetris</h1>
      </div>
    </Container>
  );
};

export default Header;
