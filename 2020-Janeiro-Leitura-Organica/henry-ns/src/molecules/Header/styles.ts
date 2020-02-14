import styled, { css } from 'styled-components';

import ExternalLink from '../../atoms/ExternalLink';

import media from '~/styles/media';

interface Props {
  pressed?: boolean;
}

export const Container = styled('header')<Props>`
  position: fixed;

  width: 100%;
  height: 80px;

  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.backgound};
  z-index: 5;

  div,
  ul {
    display: flex;
    align-items: center;
  }

  div {
    justify-content: space-between;
    padding: 0 48px;

    width: 100%;
    height: 100%;

    max-width: 1536px;

    margin: auto;
  }

  div {
    svg {
      display: none;
      cursor: pointer;
      pointer-events: none;
      transition: 0.2s ease;

      color: ${({ theme }) => theme.colors.primaryText};

      &:hover {
        color: ${({ theme }) => theme.colors.active};
        transform: scale(1.1);
      }
    }

    nav {
      font-size: 1.125rem;
      opacity: 0;
    }

    li {
      position: relative;
      overflow: hidden;
      padding: 8px;

      transition: 0.3s ease;

      &::after {
        content: '';
        position: absolute;

        width: 100%;
        height: 3px;

        bottom: 0;
        left: 0;
        transition: 0.3s ease;
        transform: translateY(150%) translateZ(0px);

        background-color: ${({ theme }) => theme.colors.active};
      }

      &:hover {
        a {
          color: ${({ theme }) => theme.colors.active};
        }

        &::after {
          transform: translateY(0px) translateZ(0px);
        }
      }
    }

    li + li {
      margin-left: 32px;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    height: 64px;

    div {
      padding: 0 24px;

      svg {
        display: block;
        pointer-events: all;

        z-index: 1;

        ${({ theme, pressed }) =>
          pressed &&
          css`
            color: ${theme.colors.backgound};

            &:hover {
              color: ${theme.colors.backgound};
            }
          `}
      }

      nav {
        position: fixed;
        background-color: ${({ theme }) => theme.colors.active};

        width: 100%;
        height: 100%;

        bottom: 100%;
        left: 0;

        transition: 0.5s ease-out;
        transform: translateY(${({ pressed }) => (pressed ? '100%' : '0px')})
          translateZ(0px);

        opacity: ${({ pressed }) => (pressed ? 1 : 0)};

        ul {
          height: 100%;

          flex-direction: column;
          align-items: center;
          justify-content: center;

          font-size: 2rem;

          li {
            margin: 16px 0px;
            transition: 0.2s ease-out;

            &::after {
              background-color: ${({ theme }) => theme.colors.backgound};
              height: 4px;
            }

            a,
            &:hover a {
              color: ${({ theme }) => theme.colors.backgound};
            }
          }

          li:nth-child(1) {
            transition-delay: 0.1s;
          }

          li:nth-child(2) {
            transition-delay: 0.2s;
          }

          li:nth-child(3) {
            transition-delay: 0.3s;
          }
        }
      }
    }
  }
`;

export const ExternalAnchor = styled(ExternalLink)`
  transition: 0.2s ease-out;

  div {
    width: 134px;
    height: 62px;
    user-select: none;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  @media (max-width: ${media.smallTablet}) {
    div {
      width: 99.1px;
      height: 48px;
    }
  }
`;
