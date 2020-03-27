import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 64px auto;

  strong {
    color: ${({ theme }) => theme.colors.active};
    font-weight: 400;
  }

  div {
    margin-left: 128px;

    ul {
      margin-bottom: 64px;

      li {
        position: relative;
        font-size: 2.25rem;
        line-height: 150%;

        max-width: 712px;
        padding: 24px 0;

        &:before {
          content: '';
        }
      }
    }
  }

  @media (max-width: ${media.hd}) {
    img {
      width: 300px;
    }

    div {
      margin-left: 64px;

      ul {
        margin-bottom: 32px;

        li {
          font-size: 1.5rem;
          padding: 16px 0;
          max-width: 450px;
        }
      }
    }
  }

  @media (max-width: ${media.smallTablet}) {
    img {
      width: 200px;
    }

    div {
      margin-left: 40px;

      ul li {
        font-size: 1.25rem;
        max-width: 400px;
      }
    }
  }

  @media (max-width: ${media.bigPhone}) {
    flex-direction: column-reverse;
    align-items: center;

    position: relative;
    max-width: 400px;
    margin: 16px auto 64px;

    img {
      width: 200px;
      margin-right: auto;
    }

    div {
      margin-left: 0px;
      margin-bottom: 32px;

      ul li {
        text-align: center;
      }

      button {
        position: absolute;
        right: 0;
        bottom: 150px;

        transform: translate(-30%, -50%);
      }
    }
  }

  @media (max-width: ${media.smallPhone}) {
    margin: auto;

    img {
      display: none;
    }

    div {
      margin: auto;

      button {
        position: initial;
        margin: auto;

        transform: translate(0, 0);
      }
    }
  }
`;
