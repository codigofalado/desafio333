import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.div`
  position: sticky;

  width: 100px;
  height: 100px;

  background-color: white;

  top: 104px;

  &::after {
    content: '';
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 76px;
    height: 76px;

    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;

    z-index: -1;
  }

  svg {
    stroke: ${({ theme }) => theme.colors.active};
  }

  span {
    position: absolute;

    color: ${({ theme }) => theme.colors.active};
    font-weight: bold;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  @media (max-width: ${media.tablet}) {
    width: 80px;
    height: 80px;

    &:after {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    position: fixed;
    top: 96px;
  }

  @media (max-width: ${media.phone}) {
    position: fixed;

    width: 64px;
    height: 64px;

    svg,
    &::after {
      display: none;
    }

    top: 0;
    left: 50%;
    z-index: 10;
  }
`;
