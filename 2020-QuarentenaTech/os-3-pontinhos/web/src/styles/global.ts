import { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primaryText};

    font: ${rem('24px')} 'VT323', monospace;
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
  }
`;
