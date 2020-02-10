import styled from 'styled-components';

import ExternalLink from '../ExternalLink';

export const Container = styled.header`
  justify-content: space-between;

  height: 80px;

  &,
  ul {
    display: flex;
    align-items: center;
  }

  li + li {
    margin-left: 32px;
  }
`;

export const ExternalAnchor = styled(ExternalLink)`
  transition: 0.2s ease-out;

  div {
    width: 134px;
    height: 62px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;
