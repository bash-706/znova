import styled from 'styled-components';
import Heading from '../ui/Heading';

const StyledFeatures = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  gap: 4rem;
`;

const StyledFeature = styled.div`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-grey-100);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  & img {
    border-radius: 1rem;
    height: 8rem;
  }
`;

function Features() {
  return (
    <StyledFeatures>
      <StyledFeature>
        <img src="/developer.png" />
        <Heading as="h6">Team of Experts</Heading>
      </StyledFeature>
      <StyledFeature>
        <img src="/dollars.png" />
        <Heading as="h6">Reasonable Prices</Heading>
      </StyledFeature>
      <StyledFeature>
        <img src="/secure-payment.png" />
        <Heading as="h6">Various Payment Methods</Heading>
      </StyledFeature>
      <StyledFeature>
        <img src="/cashback.png" />
        <Heading as="h6">Money Back Guarantee</Heading>
      </StyledFeature>
      <StyledFeature>
        <img src="/help-desk.png" />
        <Heading as="h6">24/7 Customer Service</Heading>
      </StyledFeature>
    </StyledFeatures>
  );
}

export default Features;
