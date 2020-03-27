import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;

  li {
    transition: 0.2s ease-out;

    svg {
      height: 32px;
      width: 32px;
    }

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(0.9);
    }
  }

  li + li {
    margin-left: 32px;
  }
`;
