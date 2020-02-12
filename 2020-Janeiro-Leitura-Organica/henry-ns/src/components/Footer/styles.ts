import styled from 'styled-components';

export const Container = styled.footer`
  text-align: center;
  padding: 24px 0px;

  p + p {
    margin-top: 8px;
  }

  strong,
  a {
    color: ${({ theme }) => theme.colors.active};
    font-weight: normal;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.activeDark};
  }
`;
