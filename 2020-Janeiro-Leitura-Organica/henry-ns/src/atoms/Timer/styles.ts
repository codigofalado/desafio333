import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;

  width: 100px;
  height: 100px;

  background-color: white;

  top: 80px;

  svg {
    width: 100px;
    height: 100px;
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
`;
