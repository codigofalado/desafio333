import React, { FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Container, ExternalAnchor } from './styles';

const Header: FC = () => {
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

  return (
    <Container>
      <ExternalAnchor href="https://www.leituraorganica.com.br/">
        <Img fluid={image.sharp.fluid} alt="Leitura Orgânica" />
      </ExternalAnchor>
      <ul>
        <li>
          <a href="#sobre">Sobre</a>
        </li>
        <li>
          <a href="#teste">Realizar teste</a>
        </li>
      </ul>
    </Container>
  );
};

export default Header;
