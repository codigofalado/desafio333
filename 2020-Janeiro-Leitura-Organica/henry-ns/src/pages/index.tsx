import React, { FC } from 'react';

import Description from '~/organisms/Description';
import Home from '~/organisms/Home';
import Layout from '~/template/Layout';

const IndexPage: FC = () => (
  <Layout title="Home">
    <Home />
    <Description />
  </Layout>
);

export default IndexPage;
