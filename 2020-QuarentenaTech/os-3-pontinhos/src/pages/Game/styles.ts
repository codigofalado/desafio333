import styled from 'styled-components';

import { rem } from 'polished';

import MainContainer from '../../styles/Container';

export const Container = styled(MainContainer)`
  display: flex;
  justify-content: space-between;

  margin: auto;
  max-width: 900px;

  section:first-of-type {
    position: relative;
  }

  section:last-of-type {
    width: 100%;
    max-width: 300px;
    margin-left: 64px;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      strong {
        color: ${({ theme }) => theme.colors.secondaryText};
        font-size: ${rem('48px')};
      }
    }

    div + div {
      margin-top: 40px;
    }
  }
`;

export const NextPiece = styled.div`
  flex-direction: column;
  align-items: flex-start;

  h2 {
    margin: 0 auto 16px 0;
  }

  div {
    display: flex;

    background: ${({ theme }) => theme.colors.backgroundDark};

    width: 100%;
    height: 100px;

    img {
      margin: auto;
    }
  }
`;

export const GameOver = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`;
