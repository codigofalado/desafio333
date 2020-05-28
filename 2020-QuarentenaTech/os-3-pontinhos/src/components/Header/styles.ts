import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.backgroundDark};
  div {
    display: flex;
    align-items: center;

    width: 100%;
    max-width: ${({ theme }) => theme.sizes.maxWidth};

    margin: 0 auto;
    padding: 40px 32px;
  }

  a,
  h1 {
    color: ${({ theme }) => theme.colors.active};
    font-size: ${rem('48px')};
  }

  h1 {
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  svg {
    height: 32px;
    width: 32px;

    margin-right: 32px;
  }
`;
