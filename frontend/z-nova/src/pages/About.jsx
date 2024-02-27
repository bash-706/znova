import Row from '../ui/Row';
import Heading from '../ui/Heading';
import Hero from '../ui/Hero';
import Team from '../ui/Team';
import styled from 'styled-components';

const StyledAbout = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10rem;
  padding: 6.4rem 4.8rem 6.4rem;
`;

function About() {
  return (
    <>
      <Hero
        bg="/2.jpg"
        location="center"
        style={{ backgroundPosition: '100px' }}
      >
        <Heading
          as="h1"
          style={{
            paddingBottom: '0.4rem',
            textAlign: 'center',
            zIndex: '1',
          }}
        >
          About Us
        </Heading>
        <p style={{ zIndex: '1' }}>Come and explore about us</p>
      </Hero>
      <StyledAbout>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            padding: '4rem',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: '1rem',
          }}
        >
          <img src="/t2.jpg" style={{ borderRadius: '1rem' }} />
          <div>
            <div style={{ textAlign: 'center' }}>
              <img src="info_3122682.png" style={{ width: '6rem' }} />
            </div>
            <Heading
              as="h3"
              style={{ padding: '0 0 2rem 0', textAlign: 'center' }}
            >
              About ZNova
            </Heading>
            <p style={{ lineHeight: 1.7 }}>
              With a team of meticulously-chosen and verified leading experts
              who master their craft, ZNova offers one of it&apos;s kind
              services to it&apos;s dear customers, so you don&apos;t have to go
              on a rampage of searching for expertise or go through the hassle
              of comparing prices for economy, because we have got it all
              covered for you, and this is exactly what makes us different from
              other freelance marketplaces. We prioritize quality, reliability
              and customer satisfaction, ensuring that every interaction with
              our platform is positive and rewarding experience. We trust our
              professionals and want you to have some of it by choosing ZNova.
            </p>
          </div>
        </div>
        <Row>
          <Heading as="h5">Meet Our Team</Heading>
          <Team />
        </Row>
      </StyledAbout>
    </>
  );
}

export default About;
