import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin-left: 104px;

    a,
    h1,
    strong {
      color: ${({ theme }) => theme.colors.active};
    }

    a,
    p {
      font-size: 2.25rem;
    }

    img {
      max-height: 400px;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 24px;
    }

    strong {
      font-weight: 400;
    }

    p + p {
      margin: 104px 0 16px;
    }
  }
`;
