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
import Features from './Features';
import Banner from '../ui/Banner';
import Articles from '../ui/Articles';
import BusinessPlansSection from '../ui/BusinessPlans';

const StyledHome = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12rem;
  padding: 6.4rem 0;
  & .box {
    padding: 0 4.8rem;
  }
`;

const StyledChracteristic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & p {
    width: 80%;
  }

  & .icon {
    height: 8rem;
    width: 8rem;
    background: var(--color-brand-200);
    border-radius: 50%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-500);
  }
`;

function HomePage() {
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
            <Heading as="h1" style={{ paddingBottom: '1rem' }}>
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
        <div
          style={{
            display: 'grid',
            gap: '5rem',
            background: 'var(--color-grey-0)',
            padding: '4.8rem',
          }}
        >
          <Heading as="h5">How It Works</Heading>
          <StyledChracteristic>
            <img
              src="/hiw-1.png"
              style={{
                width: '100%',
                borderRadius: '1rem',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                gap: '2rem',
              }}
            >
              <img src="ds-1.png" style={{ width: '6rem' }} />
              <Heading as="h2">01. Explore Services</Heading>
              <p>
                Browse through our comprehensive range of digital services
                available on the <b>Services</b> page. Discover solutions
                tailored to your needs, from web development to cybersecurity
                and graphic design.
              </p>
            </div>
          </StyledChracteristic>
          <StyledChracteristic>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                gap: '2rem',
              }}
            >
              <img src="ds-16.png" style={{ width: '6rem' }} />
              <Heading as="h2">02. Select the Desired Service</Heading>
              <p>
                Choose the specific service that meets your requirements.
                Utilize our user-friendly filters, sorting options, and
                pagination to easily find the perfect solution for your project.
              </p>
            </div>
            <img
              src="/6106991.jpg"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
          </StyledChracteristic>
          <StyledChracteristic>
            <img
              src="/abc.jpg"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                gap: '2rem',
              }}
            >
              <img src="ds-6.png" style={{ width: '6rem' }} />
              <Heading as="h2">03. Select a Suitable Package</Heading>
              <p>
                Customize your experience by selecting the package that best
                suits your needs: Basic, Standard, or Premium. Each package
                offers varying levels of features and benefits to accommodate
                your budget and goals.
              </p>
            </div>
          </StyledChracteristic>
          <StyledChracteristic>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                gap: '2rem',
              }}
            >
              <img src="ds-7.png" style={{ width: '6rem' }} />
              <Heading as="h2">04. Checkout Securely</Heading>
              <p>
                Click the <b>Buy Now</b> button to proceed to our secure
                checkout page powered by Stripe. Complete your payment quickly
                and securely, knowing that your transaction is protected by
                industry-leading encryption and security measures.
              </p>
            </div>
            <img
              src="/i-8.jpg"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
          </StyledChracteristic>
          <StyledChracteristic>
            <img
              src="/ds-13.jpg"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                gap: '2rem',
              }}
            >
              <img src="ds-10.png" style={{ width: '6rem' }} />
              <Heading as="h2">05. Sit Back and Relax!</Heading>
              <p>
                Once your payment is confirmed, our team will get to work on
                delivering your project promptly and efficiently. We&apos;ll
                keep you updated on the progress and ensure that your project is
                completed to your satisfaction within the specified timeframe.
              </p>
            </div>
          </StyledChracteristic>
        </div>
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
      </StyledHome>
    </>
  );
}

export default HomePage;
