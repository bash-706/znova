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
  gap: 2rem;
  padding: 4rem 0;
`;

const StyledLi = styled.li`
  padding: 1rem 0;
  list-style: disc;
`;

function Choose() {
  return (
    <StyledChoose>
      <img
        src="/694.jpg"
        height="100%"
        width="100%"
        style={{ borderRadius: '2rem 0 0 2rem' }}
      ></img>
      <StyledChooseContent>
        <Heading as="h5">Why Choose Us?</Heading>
        <ul style={{ padding: '0 6rem' }}>
          <StyledLi>
            We understand that one size does not fit all. Our solutions are
            customized to meet your specific goals and challenges.
          </StyledLi>
          <StyledLi>
            Our extensive portfolio of successful projects speaks volumes about
            our expertise and the results we can deliver.
          </StyledLi>
          <StyledLi>
            We are here for you around the clock, ensuring your digital systems
            run smoothly, day and night.
          </StyledLi>
        </ul>
      </StyledChooseContent>
    </StyledChoose>
  );
}

export default Choose;
