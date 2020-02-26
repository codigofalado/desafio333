import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;

  li {
    svg {
      height: 32px;
      width: 32px;
    }
  }

  li + li {
    margin-left: 32px;
  }
`;
