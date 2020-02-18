import React, { FC } from 'react';
import { FaPlay } from 'react-icons/fa';

import woman from '~/assets/woman.svg';

import { Container } from './styles';
import StartButton from '~/styles/button';

interface Props {
  onClick: () => void;
}

const Rules: FC<Props> = ({ onClick }) => (
  <Container>
    <img src={woman} alt="woman" />

    <div>
      <ul>
        <li>
          Clique no <strong>botão a abaixo</strong> para começar o teste.
        </li>
        <li>
          Ao começar o teste, o <strong>temporizador</strong> irá iniciar.
        </li>
        <li>
          Ao termino da leitura, clique em <strong>finalizar</strong> para saber
          o resultado.
        </li>
      </ul>

      <StartButton onClick={onClick}>
        Iniciar <FaPlay size={24} />
      </StartButton>
    </div>
  </Container>
);

export default Rules;
