import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Heading from '../ui/Heading';
import Button from '../ui/Button';

const StyledPageNotFound = styled.main`
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

const Image = styled.img`
  height: 30rem;
  width: auto;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
`;

function PageNotFound() {
  return (
    <StyledPageNotFound>
      <Box>
        <Image src="/404.png" alt="404" />
        <Heading as="h1">Page Not Found!</Heading>
        <Heading as="h3">
          The Page you are looking for could not be found 😢
        </Heading>
        <Button
          size="medium"
          variation="primary"
          style={{ marginTop: '3rem', textTransform: 'uppercase' }}
        >
          <StyledLink to="/">Go to homepage</StyledLink>
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
