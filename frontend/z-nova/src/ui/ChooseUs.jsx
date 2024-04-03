import styled from 'styled-components';
import Heading from './Heading';

const StyledChoose = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: 2rem;
  height: 40rem;
`;

const StyledChooseContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 0;
`;

const StyledLi = styled.li`
  padding: 1rem 0;
  list-style: disc;
`;

function Choose() {
  return (
    <StyledChoose>
      <img
        src="/1.png"
        height="100%"
        width="100%"
        style={{ borderRadius: '2rem 0 0 2rem' }}
      ></img>
      <StyledChooseContent>
        <Heading as="h5">Why Choose Us?</Heading>
        <ul style={{ padding: '0 6rem' }}>
          <StyledLi>
            Comprehensive suite of digital services, including tailored
            solutions for diverse needs.
          </StyledLi>
          <StyledLi>
            Cutting-edge technology and innovative solutions to stay ahead of
            industry trends.
          </StyledLi>
          <StyledLi>
            Commitment to personalized service, understanding client objectives,
            and delivering results.
          </StyledLi>
          <StyledLi>
            Dedicated customer support, with ongoing assistance and maintenance
            for long-term success.
          </StyledLi>
        </ul>
      </StyledChooseContent>
    </StyledChoose>
  );
}

export default Choose;
