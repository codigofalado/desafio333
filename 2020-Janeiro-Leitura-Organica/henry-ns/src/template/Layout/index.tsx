import React, { FC } from 'react';

import SEO from '~/atoms/SEO';

import Footer from '~/molecules/Footer';
import Header from '~/molecules/Header';

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
    <Footer />
  </>
);

export default Layout;
