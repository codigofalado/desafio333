import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100vh;

  h1 {
    font-size: 3rem;
    font-weight: 400;

    letter-spacing: 3%;
    line-height: 150%;

    width: 100%;
    max-width: 580px;

    margin-bottom: 96px;
  }

  > div {
    margin-right: 104px;
  }

  > div,
  img {
    flex: 1;
    z-index: 1;
  }

  img {
    width: 90%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
