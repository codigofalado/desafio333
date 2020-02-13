import styled from 'styled-components';

export const Container = styled.section`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 100%;
      max-width: 690px;
    }

    article {
      width: 100%;
      max-width: 595px;

      strong {
        color: ${({ theme }) => theme.colors.active};
        font-weight: 400;
      }

      p,
      h1 {
        letter-spacing: 3%;
        line-height: 150%;
      }

      h1 {
        font-size: 2.25rem;
        margin-bottom: 32px;
      }

      p {
        font-size: 1.5rem;
      }

      p + p {
        margin-top: 24px;
      }
    }
  }

  div:first-child {
    padding: 184px 0px;

    img {
      margin-right: 160px;
    }
  }

  div + div {
    margin-bottom: 184px;

    img {
      margin-left: 160px;
    }

    text-align: right;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 400;
    text-align: center;

    margin-bottom: 32px;
  }

  a {
    margin: 0px auto;
    max-width: 173px;

    margin-bottom: 124px;
  }
`;
