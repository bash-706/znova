import Heading from '../ui/Heading';
import ServicesList from '../features/services/ServicesList';
import Hero from '../ui/Hero';
import styled from 'styled-components';
import Row from '../ui/Row';
import ServiceOperations from '../features/services/ServiceOperations';

const StyledServices = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6.4rem;
  padding: 6.4rem 8rem 6.4rem;
`;

function Services() {
  return (
    <>
      <Hero bg="6106991.jpg" location="center">
        <Heading
          as="h1"
          style={{
            paddingBottom: '0.4rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          Services
        </Heading>
        <p style={{ zIndex: 1 }}>One stop solution for your digital needs.</p>
      </Hero>
      <StyledServices>
        <Row type="horizontal">
          <Heading as="h4">All Services</Heading>
          <ServiceOperations />
        </Row>
        <Row>
          <ServicesList />
        </Row>
      </StyledServices>
    </>
  );
}

export default Services;
