import React, { FC, useState } from 'react';

import Calculator from '~/organisms/Calculator';
import Rules from '~/organisms/Rules';
import Layout from '~/template/Layout';

import data from './data.json';

import { Container } from './styles';

const Test: FC = () => {
  const [start, setStart] = useState(false);

  return (
    <Layout title="Teste">
      <Container>
        {start ? (
          <Calculator
            data={data.texts[Math.floor(Math.random() * data.texts.length)]}
          />
        ) : (
          <Rules onClick={() => setStart(true)} />
        )}
      </Container>
    </Layout>
  );
};

export default Test;
