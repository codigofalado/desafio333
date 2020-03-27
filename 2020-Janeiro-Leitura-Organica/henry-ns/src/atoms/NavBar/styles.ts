import styled, { css } from 'styled-components';

import media from '~/styles/media';

interface Props {
  selected: boolean;
}

export const NavItem = styled('li')<Props>`
  position: relative;
  overflow: hidden;
  padding: 8px;

  transition: 0.3s ease;

  & + & {
    margin-left: 32px;
  }

  &::after {
    content: '';
    position: absolute;

    width: 100%;
    height: 3px;

    bottom: 0;
    left: 0;
    transition: 0.3s ease;
    transform: translateY(150%) translateZ(0px);

    background-color: ${({ theme }) => theme.colors.active};
  }

  &:hover {
    a {
      color: ${({ theme }) => theme.colors.active};
    }

    &::after {
      transform: translateY(0px) translateZ(0px);
    }
  }

  ${({ selected }) =>
    selected &&
    css`
      a {
        color: ${({ theme }) => theme.colors.active};
      }

      &::after {
        transform: translateY(0px) translateZ(0px);
      }
    `}


  @media (max-width: ${media.smallTablet}) {
    margin: 16px 0px;
    transition: 0.2s ease-out;

    & + & {
      margin-left: 0px;
    }

    &::after {
      background-color: ${({ theme }) => theme.colors.backgound};
      height: 4px;
    }

    a,
    &:hover a {
      color: ${({ theme }) => theme.colors.backgound};
    }
  }
`;
