import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  height: 100%;
  min-height: calc(100vh - 97px);
  padding-top: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${media.smallTablet}) {
    padding-top: 64px;
    min-height: calc(100vh - 71px);
  }
`;
