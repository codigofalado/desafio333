import styled from 'styled-components';

import { rem, opacify } from 'polished';

import MainContainer from '../../styles/Container';

export const Container = styled(MainContainer)`
  h1 {
    text-align: center;
    font-size: ${rem('48px')};
    letter-spacing: 0.2em;

    margin: 48px 0;
  }

  form {
    font-size: ${rem('36px')};
    letter-spacing: 0.05em;

    max-width: 715px;
    margin: 0 auto;

    label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:first-of-type) {
        cursor: pointer;
      }

      & + label {
        margin-top: 64px;
      }
    }

    input[type='text'] {
      max-width: 180px;
      height: 32px;
      background: transparent;
      border: 0;

      text-align: center;
      font-size: ${rem('36px')};
      color: ${({ theme }) => theme.colors.secondaryText};

      pointer-events: none;
      outline: none;
    }

    button[type='button'] {
      background: transparent;
      cursor: pointer;
      border: 0;

      svg {
        height: 24px;
        width: 24px;
      }
    }

    span {
      height: 32px;
      width: 32px;

      background: ${({ theme }) => theme.colors.secondaryText};
      position: relative;

      &::before {
        content: '';
        position: absolute;

        width: 8px;
        height: 16px;
        margin: 0 4px;

        top: 3px;
        left: 6px;

        border-right: 4px solid ${({ theme }) => theme.colors.active};
        border-bottom: 4px solid ${({ theme }) => theme.colors.active};
        opacity: 0;

        transition: all 0.3s ease-out;
      }
    }

    input[type='checkbox'] {
      display: none;
      cursor: pointer;

      &:checked ~ span::before {
        transform: rotate(45deg);
        opacity: 1;
      }
    }
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  font-size: ${rem('24px')};
  letter-spacing: 0.25rem;
  text-transform: uppercase;

  border: 0;
  margin-top: 64px;
  height: 40px;
  width: 100%;

  background: ${({ theme }) => opacify(-0.2, theme.colors.active)};
  color: ${({ theme }) => theme.colors.backgroundDark};
  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.colors.active};
  }

  &:active {
    transform: scale(0.95);
    background: ${({ theme }) => theme.colors.active};
  }
`;
