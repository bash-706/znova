import styled from 'styled-components';
import Heading from './Heading';
import Button from './Button';
import { Link } from 'react-router-dom';

const StyledBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  height: 50vh;
  background-image: url('/hello-9.jpg');
  width: 100%;
  background-position: center;
  color: #dfdfdf;
`;

function Banner() {
  return (
    <StyledBanner>
      <Heading as="h3" style={{ fontSize: '1.6rem' }}>
        ARE YOU READY FOR YOUR NEXT PROJECT?
      </Heading>
      <Heading as="h4" style={{ fontSize: '2.4rem' }}>
        LET&apos;S GET STARTED ON YOUR PROJECT NOW
      </Heading>
      <Link to="/services">
        <Button variation="primary" size="large" style={{ marginTop: '2rem' }}>
          START NOW
        </Button>
      </Link>
    </StyledBanner>
  );
}

export default Banner;
