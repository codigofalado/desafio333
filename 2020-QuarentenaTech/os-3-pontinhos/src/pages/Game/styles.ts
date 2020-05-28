import styled from 'styled-components';

import { rem } from 'polished';

import MainContainer from '../../styles/Container';

export const Container = styled(MainContainer)`
  display: flex;
  justify-content: space-between;

  margin: auto;
  max-width: 900px;

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
