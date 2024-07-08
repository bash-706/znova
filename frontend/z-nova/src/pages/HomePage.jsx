import { Link } from 'react-router-dom';
// import { useUser } from '../features/authentication/useUser';
import Row from '../ui/Row';
// import Spinner from '../ui/Spinner';
import { HiArrowRight } from 'react-icons/hi2';
import Hero from '../ui/Hero';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import styled from 'styled-components';
import ChooseUs from '../ui/ChooseUs';
import Features from '../ui/Features';
import Banner from '../ui/Banner';
import Articles from '../ui/Articles';
import BusinessPlansSection from '../ui/BusinessPlans';
import HowItWorks from '../ui/HowItWorks';
import { useCookies } from 'react-cookie';
import CookieConsent from '../ui/CookieConsent';

const StyledHome = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12rem;
  padding: 6.4rem 0;
  & .box {
    padding: 0 4.8rem;
  }
`;

function HomePage() {
  const [cookies] = useCookies(['cookieConsent']);
  // const { user, isLoading } = useUser();

  return (
    <>
      <Hero
        bg="Vector_2640-modified.jpg"
        length="calc(100vh - 6.2rem)"
        location="left"
      >
        <div
          style={{
            padding: '0 6rem',
            width: '50%',
            color: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Heading
              as="h1"
              style={{
                paddingBottom: '1rem',
              }}
            >
              ZNOVA
            </Heading>
            <p>Solutions</p>
          </div>
          <Heading as="h3" style={{ paddingBottom: '1rem' }}>
            Cutting-Edge Solutions for Today&#39;s Digital World
          </Heading>
          <p style={{ paddingBottom: '3rem' }}>
            ZNOVA is an online, non-profitable website which provides digital
            services to its customers and is well known for its best work. we
            are dedicated to being your trusted source for all things tech.
          </p>
          <Link to="/services">
            <Button size="medium" variation="primary">
              Explore Services
            </Button>
          </Link>
        </div>
      </Hero>

      <StyledHome>
        {/* <h4>{isLoading ? 'Loading...' : user?.name}</h4> */}
        {/* <Spinner /> */}
        <Row className="box">
          <Heading as="h5" style={{ textAlign: 'center' }}>
            Features
          </Heading>
          <Features />
        </Row>
        <Row className="box">
          <ChooseUs />
        </Row>
        <HowItWorks />
        <Row className="box">
          <Heading as="h5">Business Plans</Heading>
          <BusinessPlansSection />
        </Row>
        <Row className="box">
          <Heading as="h5">Explore Our Blog</Heading>
          <Articles />
          <Button
            variation="primary"
            size="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              width: 'fit-content',
              margin: '0 auto',
              fontWeight: '500',
              marginTop: '4rem',
            }}
          >
            <Link to="/blog">See More</Link>
            <HiArrowRight />
          </Button>
        </Row>
        <Row className="box">
          <Banner />
        </Row>
        {!cookies.cookieConsent && <CookieConsent />}
      </StyledHome>
    </>
  );
}

export default HomePage;
