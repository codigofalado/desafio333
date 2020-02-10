import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: calc(100vh - 80px);

  h1 {
    font-size: 3rem;
    font-weight: 400;

    letter-spacing: 3%;
    line-height: 150%;

    max-width: 580px;

    margin-bottom: 96px;
  }

  > div {
    flex: 1;
  }

  img {
    max-height: 600px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
