import styled from 'styled-components';

import { lighten } from 'polished';

import Button from '~/styles/button';
import media from '~/styles/media';

export const Container = styled.section`
  article {
    transform: translateY(-32px);
    margin: 0 200px;

    h1 {
      font-size: 2rem;
    }

    h2 {
      color: ${({ theme }) => lighten(0.3, theme.colors.primaryText)};
      margin: 8px 0 32px;
    }

    p {
      letter-spacing: 3%;
      line-height: 150%;
    }

    p + p {
      margin-top: 16px;
    }
  }

  @media (max-width: ${media.hd}) {
    article {
      margin: 0 160px;
    }
  }

  @media (max-width: ${media.smallDesktop}) {
    article {
      margin: 0 80px 0 124px;
    }
  }

  @media (max-width: ${media.tablet}) {
    article {
      margin: 0 64px 0 104px;
    }
  }

  @media (max-width: ${media.smallTablet}) {
    article {
      margin-top: 32px;
      transform: translateY(0px);
    }
  }

  @media (max-width: ${media.bigPhone}) {
    article {
      margin-right: 0;
      margin-left: 96px;
    }
  }
  @media (max-width: ${media.phone}) {
    article {
      margin-left: 0px;
    }
  }
`;

export const FinishButton = styled(Button)`
  margin: 64px auto 104px;
  padding-left: 32px;

  @media (max-width: ${media.smallDesktop}) {
    margin: 32px auto 72px;
    padding-left: 24px;
  }

  @media (max-width: ${media.smallTablet}) {
    margin: 32px auto 48px;
    padding-left: 16px;
  }

  @media (max-width: ${media.bigPhone}) {
    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }
  }
`;
