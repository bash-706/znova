import styled from 'styled-components';
import Heading from './Heading';

const StyledChoose = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: 2rem;
`;

const StyledChooseContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 0;
  font-size: 1.6rem;

  @media (min-width: 84em) {
    font-size: 1.2em;
    gap: 2rem;

    & h5 {
      font-size: 1.5em;
    }
  }

  @media (min-width: 108em) {
    font-size: 1.3em;
    gap: 2.5rem;
  }

  @media (min-width: 118em) {
    font-size: 1.4em;
    gap: 3rem;
  }
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
        width="100%"
        style={{ borderRadius: '2rem 0 0 2rem', alignSelf: 'stretch' }}
      ></img>
      <StyledChooseContent>
        <Heading style={{ margin: 0 }} as="h5">
          Why Choose Us?
        </Heading>
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
