import React, { FC, useState } from 'react';
import { FaBars } from 'react-icons/fa';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import NavBar, { Item } from '~/atoms/NavBar';

import { Container, ExternalAnchor } from './styles';

const menuList = [
  { id: 'menu1', title: 'Home', href: '/#home' },
  { id: 'menu2', title: 'Realizar Teste', href: '/teste' },
  { id: 'menu3', title: 'Sobre', href: '/#sobre' },
];

const Header: FC = () => {
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(() => {
    const { pathname, hash } = window.location;

    if (pathname === '/teste') return 'menu2';

    return hash === '#sobre' ? 'menu3' : 'menu1';
  });

  const { image } = useStaticQuery(
    graphql`
      query {
        image: file(relativePath: { eq: "logo.png" }) {
          sharp: childImageSharp {
            fluid(maxHeight: 62, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  function togglePressed() {
    setPressed(!pressed);
  }

  function setPressedToFalse(item: Item) {
    setPressed(false);
    setSelected(item.id);
  }

  return (
    <Container pressed={pressed}>
      <div>
        <ExternalAnchor href="https://www.leituraorganica.com.br/">
          <Img fluid={image.sharp.fluid} alt="Leitura Orgânica" />
        </ExternalAnchor>
        <FaBars size={30} onClick={togglePressed} />
        <NavBar
          items={menuList}
          onClick={setPressedToFalse}
          selected={selected}
        />
      </div>
    </Container>
  );
};

export default Header;
