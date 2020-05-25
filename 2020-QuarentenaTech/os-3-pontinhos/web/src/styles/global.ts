import { createGlobalStyle } from 'styled-components';
import { opacify } from 'polished';

export default createGlobalStyle`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => opacify(-0.4, theme.colors.secondaryText)};
    transition: 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.secondaryText};
    }
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &::selection {
      background-color: ${({ theme }) => opacify(-0.4, theme.colors.active)};
      color: white;
    }
  }

  body,
  input,
  button,
  a {
    font-family: 'VT323', monospace;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  h1,
  h2,
  strong {
    letter-spacing: 0.05em;
    font-weight: 400;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  strong {
    color: ${({ theme }) => theme.colors.active};
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }
`;
