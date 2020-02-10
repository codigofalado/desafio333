import React, { FC } from 'react';

import Home from '~/organisms/Home';
import Layout from '~/template/Layout';

const IndexPage: FC = () => (
  <Layout title="Home">
    <Home />
  </Layout>
);

export default IndexPage;
