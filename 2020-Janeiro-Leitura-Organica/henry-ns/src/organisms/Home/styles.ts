import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;

  height: 100vh;

  h1 {
    font-size: 3rem;
    font-weight: 400;

    letter-spacing: 3%;
    line-height: 150%;

    width: 100%;
    max-width: 580px;

    margin-bottom: 96px;
  }

  > div {
    margin-right: 104px;
  }

  > div,
  img {
    z-index: 1;
  }

  img {
    width: 90%;
    max-width: 700px;
  }

  @media (max-width: ${media.hd}) {
    h1 {
      font-size: 2.25rem;
      max-width: 469px;
    }

    img {
      max-width: 504px;
    }
  }

  @media (max-width: ${media.smallDesktop}) {
    flex-direction: column-reverse;
    justify-content: center;

    > div {
      margin: auto;
      margin-top: 0;

      text-align: center;

      h1 {
        margin-top: 64px;
        margin-bottom: 32px;
      }
    }

    img {
      margin: auto;
      margin-bottom: 0;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  @media (max-width: ${media.smallDesktop}) {
    a {
      flex: 1;
      max-width: 160px;
    }

    justify-content: center;
  }

  @media (max-width: ${media.smallTablet}) {
    a {
      max-width: 134px;
    }
  }
`;
