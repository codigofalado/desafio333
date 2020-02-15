import React, { FC } from 'react';

import loadable from '@loadable/component';

import SEO from '~/atoms/SEO';

import Footer from '~/molecules/Footer';
// import Header from '~/molecules/Header';

import GlobalStyles from '~/styles/global';

const Header = loadable(() => import('~/molecules/Header'));

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
