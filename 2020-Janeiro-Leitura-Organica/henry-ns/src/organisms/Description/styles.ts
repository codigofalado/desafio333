import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  position: relative;
  padding-bottom: 128px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 100%;
      max-width: 690px;
      z-index: 1;
    }

    article {
      width: 100%;
      max-width: 595px;

      strong {
        color: ${({ theme }) => theme.colors.active};
        font-weight: 400;
      }

      p,
      h1 {
        letter-spacing: 3%;
        line-height: 150%;
      }

      h1 {
        font-size: 2.25rem;
        margin-bottom: 32px;
      }

      p {
        font-size: 1.5rem;
      }

      p + p {
        margin-top: 24px;
      }
    }
  }

  div:nth-child(3) {
    padding: 184px 0px;

    img {
      margin-right: 160px;
    }
  }

  div + div {
    margin-bottom: 184px;

    img {
      margin-left: 160px;
    }

    text-align: right;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 400;
    text-align: center;

    margin-bottom: 32px;
  }

  a {
    margin: 0px auto;
    max-width: 173px;
  }

  @media (max-width: ${media.hd}) {
    div {
      display: grid;
      grid-template-columns: 5.8fr 4.2fr;
      column-gap: 92px;

      img {
        max-width: 552.82px;
      }

      article {
        h1 {
          font-size: 2rem;
        }

        p {
          font-size: 1.125rem;
        }
      }
    }

    div:nth-child(3),
    div + div {
      img {
        margin: 0;
      }
    }

    div + div {
      grid-template-columns: 4.2fr 5.8fr;
    }
  }

  @media (max-width: ${media.smallDesktop}) {
    padding-bottom: 96px;

    div {
      display: flex;
      flex-direction: column;
    }

    div:nth-child(3) {
      padding-top: 32px;
      padding-bottom: 104px;
    }

    div + div {
      display: flex;
      flex-direction: column-reverse;

      margin-bottom: 128px;
    }

    div:nth-child(3),
    div + div {
      img {
        margin-bottom: 32px;
      }
    }

    h2 {
      font-size: 2rem;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    div {
      article {
        h1 {
          font-size: 1.5rem;
        }

        p {
          font-size: 0.875rem;
        }
      }
    }

    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const Spot = styled.img`
  position: absolute;
  user-select: none;
  pointer-events: none;

  &:first-child {
    top: 0;
    left: 0;
    transform: translate(-60%, -40%);
  }

  & + & {
    bottom: -96px;
    right: 0;

    transform: translateX(80%);
  }

  @media (max-width: ${media.tablet}) {
    &:first-child {
      transform: translate(-90%, -30%) scale(1.3);
    }
  }

  @media (max-width: ${media.smallTablet}) {
    & + & {
      transform: translateX(90%);
    }
  }
`;
