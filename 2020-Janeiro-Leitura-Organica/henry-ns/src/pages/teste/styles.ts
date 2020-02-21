import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  padding-top: 80px;
  min-height: calc(100vh - 97px);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${media.smallTablet}) {
    padding-top: 64px;
    min-height: calc(100vh - 71px);
  }
`;
