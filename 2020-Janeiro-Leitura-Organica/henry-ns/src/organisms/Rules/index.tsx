import React, { FC } from 'react';
import { FaPlay } from 'react-icons/fa';

import { Container } from './styles';

interface Props {
  onClick: () => void;
}

const Rules: FC<Props> = ({ onClick }) => (
  <Container>
    <ul>
      <li>Clique no botão no abaixo para começar o teste</li>
      <li>Ao iniciar o teste, o temporizador irá iniciar</li>
      <li>Ao terminar a leitura, clique em finalizar para saber o resultado</li>
    </ul>

    <button type="button" onClick={onClick}>
      Iniciar <FaPlay size={24} />
    </button>
  </Container>
);

export default Rules;
