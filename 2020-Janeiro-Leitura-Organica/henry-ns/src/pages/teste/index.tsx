import React, { FC, useState } from 'react';

import Calculator from '~/organisms/Calculator';
import Rules from '~/organisms/Rules';
import Layout from '~/template/Layout';

import data from './data.json';

import { Container } from './styles';

const TEXT = data.texts['1'];

const Test: FC = () => {
  const [start, setStart] = useState(false);

  return (
    <Layout title="Regras">
      <Container>
        {start ? (
          <Calculator data={TEXT} />
        ) : (
          <Rules onClick={() => setStart(true)} />
        )}
      </Container>
    </Layout>
  );
};

export default Test;
