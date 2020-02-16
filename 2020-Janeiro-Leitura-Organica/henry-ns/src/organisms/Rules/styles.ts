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

export const StartButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 32px;
  padding-left: 40px;

  font-size: 1.125rem;
  font-weight: bold;

  cursor: pointer;
  user-select: none;
  transition: 0.3s ease;

  color: ${({ theme }) => theme.colors.active};
  background-color: transparent;

  border-radius: 28px;
  border: 2px solid ${({ theme }) => theme.colors.active};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);

  svg {
    margin-left: 16px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(1);
  }

  @media (max-width: ${media.smallDesktop}) {
    padding-right: 24px;
    padding-left: 32px;
    font-size: 1rem;
  }

  @media (max-width: ${media.smallTablet}) {
    padding: 8px 16px;
    padding-left: 24px;
    font-size: 0.875rem;

    svg {
      margin-left: 8px;
      transform: scale(0.8);
    }
  }

  @media (max-width: ${media.bigPhone}) {
    &:hover {
      transform: scale(1.05) translate(-30%, -50%);
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(1) translate(-30%, -50%);
    }
  }

  @media (max-width: ${media.smallPhone}) {
    font-size: 0.75rem;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }
  }
`;
