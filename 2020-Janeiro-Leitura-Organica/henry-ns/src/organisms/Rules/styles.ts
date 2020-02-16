import styled from 'styled-components';

import media from '~/styles/media';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    color: ${({ theme }) => theme.colors.active};
    font-weight: 400;
  }

  div {
    margin-left: 128px;

    ul {
      margin-bottom: 64px;

      li {
        position: relative;
        font-size: 2.25rem;
        line-height: 150%;

        max-width: 712px;
        padding: 24px 0;

        &:before {
          content: '';
        }
      }
    }
  }
`;

export const StartButton = styled.button.attrs({
  type: 'button',
})`
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

  @media (max-width: ${media.hd}) {
    & + & {
      margin-left: 32px;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    padding: 12px 0;
    font-size: 0.875rem;
  }

  @media (max-width: ${media.smallPhone}) {
    font-size: 0.75rem;
  }
`;
