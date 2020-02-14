import React, { FC, useState } from 'react';
import { FaBars } from 'react-icons/fa';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Container, ExternalAnchor } from './styles';

const menuList = [
  { id: 'menu1', title: 'Home', href: '#home' },
  { id: 'menu2', title: 'Realizar Teste', href: '#teste' },
  { id: 'menu3', title: 'Sobre', href: '#sobre' },
];

const Header: FC = () => {
  const [pressed, setPressed] = useState(false);

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

  function setPressedToFalse() {
    setPressed(false);
  }

  return (
    <Container pressed={pressed}>
      <div>
        <ExternalAnchor href="https://www.leituraorganica.com.br/">
          <Img fluid={image.sharp.fluid} alt="Leitura Orgânica" />
        </ExternalAnchor>
        <FaBars size={30} onClick={togglePressed} />
        <nav>
          <ul>
            {menuList.map(item => (
              <li key={item.id}>
                <a href={item.href} onClick={setPressedToFalse}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default Header;
