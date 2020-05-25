import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.main`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 64px 32px;

  h1 {
    color: ${({ theme }) => theme.colors.active};
    font-size: ${rem('96px')};
    letter-spacing: 0.24em;
    text-transform: uppercase;

    text-align: center;
  }

  nav {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  li {
    padding: 16px 0;
    overflow: hidden;

    a {
      position: relative;
      padding: 16px;

      &::after {
        content: '';
        position: absolute;

        left: 0;
        bottom: 0;

        height: 6px;
        width: 100%;

        background: ${({ theme }) => theme.colors.secondaryText};

        transform: translateY(106%) translateZ(0);
        transition: transform 0.3s;
      }

      &:hover::after {
        transform: translateY(0) translateZ(0);
      }
    }
  }

  li + li {
    margin-top: 32px;
  }

  a {
    font-size: ${rem('48px')};
    letter-spacing: 0.05em;
  }
`;
