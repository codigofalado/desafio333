import styled, { css } from 'styled-components';

interface Props {
  secondary?: boolean;
}

const Secondary = css`
  color: ${({ theme }) => theme.colors.active};
  background-color: transparent;
`;

export const Container = styled('a')<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.125rem;
  font-weight: bold;

  padding: 12px 22px;

  cursor: pointer;
  user-select: none;
  transition: 0.3s ease;

  color: ${({ theme }) => theme.colors.backgound};
  background-color: ${({ theme }) => theme.colors.active};

  ${({ secondary }) => secondary && Secondary}

  border-radius: 28px;
  border: 2px solid ${({ theme }) => theme.colors.active};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);

  & + & {
    margin-left: 64px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(1);
  }
`;
