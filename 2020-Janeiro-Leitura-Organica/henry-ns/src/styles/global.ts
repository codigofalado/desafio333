import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    transition: 0.2s;
    border-radius: 2.5px;
    background: ${({ theme }) => theme.colors.active};

    &:hover {
      background: ${({ theme }) => theme.colors.activeDark};
    }
  }

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;

    &::selection {
      background-color: ${({ theme }) => theme.colors.active};
      color: ${({ theme }) => theme.colors.backgound};;
    }
  }

  html {
    scroll-behavior: smooth;

    overflow-x: hidden;
  }

  html, body {
    font: 100% 'Roboto', sans-serif;
    font-weight: 400;

    background-color: ${({ theme }) => theme.colors.backgound};
    color: ${({ theme }) => theme.colors.primaryText};

    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body.using-mouse {
    * {
      outline: none !important;
    }
  }

  #gatsby-focus-wrapper {
    position: relative;

    padding: 0 48px;
    margin: 0 auto;

    max-width: 1536px;
    min-height: 100%;
  }

  button {
    font: 16px 'Roboto', sans-serif;
    font-weight: 400;

    background: transparent;
    border: none;
  }

  a,
  button {
    color: ${({ theme }) => theme.colors.primaryText};
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  li {
    list-style-type: none;
  }
`;
