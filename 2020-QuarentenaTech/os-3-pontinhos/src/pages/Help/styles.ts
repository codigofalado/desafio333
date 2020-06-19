import styled from 'styled-components';

import { rem } from 'polished';

import MainContainer from '../../styles/Container';

export const Container = styled(MainContainer)`
  h1 {
    text-align: center;
    font-size: ${rem('48px')};
    letter-spacing: 0.2em;

    margin: 48px 0;
  }

  ul {
    margin: 32px 0 40px;
    padding: 24px;

    background: ${({ theme }) => theme.colors.backgroundDark};
    font-size: ${rem('20px')};

    li + li {
      margin-top: 16px;
    }

    span {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }
`;
