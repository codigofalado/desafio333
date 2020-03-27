import styled from 'styled-components';

import media from './media';

interface Props {
  secondary?: boolean;
}

export default styled.button.attrs({
  type: 'button',
})<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 32px;
  padding-left: 40px;

  font-size: 1.125rem;
  font-weight: bold;

  cursor: pointer;
  user-select: none;
  transition: 0.3s ease;

  color: ${({ theme }) => theme.colors.active};
  background-color: transparent;

  border-radius: 28px;
  border: 2px solid ${({ theme }) => theme.colors.active};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);

  svg {
    margin-left: 16px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(1);
  }

  @media (max-width: ${media.smallDesktop}) {
    padding-right: 24px;
    padding-left: 32px;
    font-size: 1rem;
  }

  @media (max-width: ${media.smallTablet}) {
    padding: 8px 16px;
    padding-left: 24px;
    font-size: 0.875rem;

    svg {
      margin-left: 8px;
      transform: scale(0.8);
    }
  }

  @media (max-width: ${media.bigPhone}) {
    &:hover {
      transform: scale(1.05) translate(-30%, -50%);
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(1) translate(-30%, -50%);
    }
  }

  @media (max-width: ${media.smallPhone}) {
    font-size: 0.75rem;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }
  }
`;
