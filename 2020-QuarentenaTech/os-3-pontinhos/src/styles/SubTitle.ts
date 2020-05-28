import styled from 'styled-components';

import { rem } from 'polished';

export default styled.h2`
  position: relative;
  padding-left: 20px;
  font-size: ${rem('36px')};

  &::before {
    content: '';
    position: absolute;

    height: 70%;
    width: 3px;

    top: 50%;
    left: 0;
    transform: translateY(-50%);

    background: ${({ theme }) => theme.colors.active};
  }
`;
