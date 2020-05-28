import styled from 'styled-components';

export default styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};

  margin: 0 auto;
  padding: 32px;
`;
