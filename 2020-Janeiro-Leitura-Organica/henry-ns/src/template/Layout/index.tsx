import React, { FC } from 'react';

import Header from '~/components/Header';
import SEO from '~/components/SEO';

import GlobalStyles from '~/styles/global';

interface Props {
  title: string;
}

const Layout: FC<Props> = ({ children, title }) => (
  <>
    <GlobalStyles />
    <SEO title={title} />
    <Header />
    {children}
  </>
);

export default Layout;
