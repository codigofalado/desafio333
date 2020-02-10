import styled from 'styled-components';

export const Container = styled.header`
  justify-content: space-between;

  &,
  ul {
    display: flex;
    align-items: center;
  }

  li + li {
    margin-left: 32px;
  }
`;
