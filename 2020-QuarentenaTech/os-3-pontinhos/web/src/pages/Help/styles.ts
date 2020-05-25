import styled from 'styled-components';

import { rem } from 'polished';

export const Container = styled.main`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 32px;

  h1 {
    text-align: center;
    font-size: ${rem('48px')};
    letter-spacing: 0.2em;

    margin: 48px 0;
  }

  ul {
    margin: 32px 0 40px;
    padding: 24px;

    background: ${({ theme }) => theme.colors.backgroundDark};
    font-size: ${rem('18px')};

    li + li {
      margin-top: 16px;
    }

    span {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }
`;

export const SubTitle = styled.h2`
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
