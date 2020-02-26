import styled from 'styled-components';

import ExternalLink from '~/atoms/ExternalLink';

import media from '~/styles/media';

export const Container = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  img {
    max-height: 400px;
  }

  a,
  h1,
  strong {
    color: ${({ theme }) => theme.colors.active};
  }

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      margin-left: 104px;

      h2 {
        font-size: 2.25rem;
      }

      a,
      p {
        font-size: 2rem;
      }

      h1 {
        font-size: 3rem;
        margin-bottom: 24px;
      }

      strong {
        font-weight: 400;
      }

      h2 {
        margin: 104px 0 16px;
      }
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 64px;

    h3 {
      margin: 72px 0 24px;
      text-align: center;
      font-size: 1.75rem;
    }
  }

  @media (max-width: ${media.hd}) {
    img {
      max-height: 350px;
    }

    > div:first-child {
      div {
        h1 {
          font-size: 2.25rem;
          margin-bottom: 16px;
        }

        h2 {
          font-size: 2rem;
        }

        a,
        p {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: ${media.smallDesktop}) {
    img {
      max-height: 320px;
    }

    > div:first-child div {
      margin-left: 64px;
    }
  }

  @media (max-width: ${media.tablet}) {
    img {
      max-height: 300px;
    }

    > div:first-child {
      flex-direction: column;
      align-items: flex-start;
      margin: 48px auto;

      div {
        margin-left: 0px;
        margin-top: 32px;

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.5rem;
          margin-top: 48px;
        }

        a,
        p {
          font-size: 1.25rem;
        }
      }
    }

    > div:last-child {
      align-items: flex-start;
      text-align: left;
      margin-right: auto;

      h3 {
        margin: 0 0 16px;
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: ${media.smallPhone}) {
    img {
      height: 100%;
      max-height: 250px;
    }

    > div:first-child {
      div {
        h1 {
          font-size: 1.5rem;
        }

        h2 {
          font-size: 1.25rem;
          margin-top: 48px;
        }

        a,
        p {
          font-size: 1rem;
        }
      }
    }

    > div:last-child {
      h3 {
        font-size: 1.25rem;
      }
    }
  }
`;

export const Anchor = styled(ExternalLink)`
  position: relative;
  overflow: hidden;

  padding: 2px;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;

    width: 100%;
    height: 0px;

    bottom: 0;
    left: 0;

    transition: height 0.2s ease;
    background-color: ${({ theme }) => theme.colors.activeDark};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.activeDark};

    &::after {
      height: 2px;
    }
  }
`;
