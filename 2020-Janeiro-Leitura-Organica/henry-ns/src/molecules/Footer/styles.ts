import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

import media from '~/styles/media';

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

  @media (max-width: ${media.smallTablet}) {
    padding: 16px 0px;

    * {
      font-size: 0.75rem;
    }
  }
`;

export const Heart = styled(FaHeart)`
  color: ${({ theme }) => theme.colors.active};

  margin: auto 2px;

  height: 16px;
  width: 16px;
  transform: translateY(15%);

  @media (max-width: ${media.smallTablet}) {
    height: 12px;
    width: 12px;
  }
`;
