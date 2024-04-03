import { Link } from 'react-router-dom';
// import { useUser } from '../features/authentication/useUser';
import Row from '../ui/Row';
import {
  HiArrowRight,
  HiComputerDesktop,
  HiCreditCard,
  HiFire,
} from 'react-icons/hi2';
// import Spinner from '../ui/Spinner';

import Hero from '../ui/Hero';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import styled from 'styled-components';
import ChooseUs from '../ui/ChooseUs';
import Features from './Features';
import Banner from '../ui/Banner';
import Articles from '../ui/Articles';

const StyledHome = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12rem;
  padding: 6.4rem 4.8rem 6.4rem;
`;

const StyledChracteristic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & p {
    width: 80%;
  }

  & .icon {
    height: 7rem;
    width: 7rem;
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
        <Row>
          <Heading as="h5" style={{ textAlign: 'center' }}>
            Features
          </Heading>
          <Features />
        </Row>
        <Row>
          <ChooseUs />
        </Row>
        <Row style={{ display: 'grid', gap: '5rem' }}>
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
              <div className="icon">
                <HiComputerDesktop />
              </div>
              <Heading as="h2">01. Open up the service page</Heading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                placeat eveniet ullam vitae eaque consectetur numquam molestiae
                exercitationem maxime deserunt aut corporis ipsam reprehenderit
                ad, quae nisi aperiam suscipit ut?
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
              <div className="icon">
                <HiCreditCard />
              </div>
              <Heading as="h2">02. Let us know the details</Heading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis dolor ab excepturi veniam placeat ducimus modi
                corporis, magni quia nam repudiandae cum ratione expedita
                quibusdam voluptatem quos ipsa velit ad.{' '}
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
              <div className="icon">
                <HiFire />
              </div>
              <Heading as="h2">03. Purchase the service</Heading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                placeat eveniet ullam vitae eaque consectetur numquam molestiae
                exercitationem maxime deserunt aut corporis ipsam reprehenderit
                ad, quae nisi aperiam suscipit ut?
              </p>
            </div>
          </StyledChracteristic>
        </Row>
        <Row>
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
        <Row>
          <Banner />
        </Row>
      </StyledHome>
    </>
  );
}

export default HomePage;
