import styled from 'styled-components';

import Button from '~/styles/button';

export const Container = styled.section`
  article {
    margin: 0 205px;

    p {
      letter-spacing: 3%;
      line-height: 150%;
    }

    p + p {
      margin-top: 16px;
    }
  }
`;

export const FinishButton = styled(Button)`
  margin: auto;
`;
