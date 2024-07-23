import styled from 'styled-components';
import Heading from './Heading';

const StyledChracteristic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & p {
    width: 80%;
    text-align: center;
  }

  //   & .icon {
  //     height: 8rem;
  //     width: 8rem;
  //     background: var(--color-brand-200);
  //     border-radius: 50%;
  //     padding: 1rem;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //   }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-500);
  }

  @media (min-width: 84em) {
    & svg {
      width: 40em;
      height: 40em;
    }
    & h2 {
      font-size: 1.4em;
    }
    & p {
      font-size: 1.2em;
    }
  }
`;

export default function HowItWorks() {
  return (
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
            Browse through our comprehensive range of digital services available
            on the <b>Services</b> page. Discover solutions tailored to your
            needs, from web development to cybersecurity and graphic design.
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
            Choose the specific service that meets your requirements. Utilize
            our user-friendly filters, sorting options, and pagination to easily
            find the perfect solution for your project.
          </p>
        </div>
        <img
          src="/6106991.jpg"
          style={{ width: '100%', borderRadius: '1rem' }}
        />
      </StyledChracteristic>
      <StyledChracteristic>
        <img src="/abc.jpg" style={{ width: '100%', borderRadius: '1rem' }} />
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
            Customize your experience by selecting the package that best suits
            your needs: Basic, Standard, or Premium. Each package offers varying
            levels of features and benefits to accommodate your budget and
            goals.
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
            Click the <b>Buy Now</b> button to proceed to our secure checkout
            page powered by Tazapay. Complete your payment quickly and securely,
            knowing that your transaction is protected by industry-leading
            encryption and security measures.
          </p>
        </div>
        <img src="/i-8.jpg" style={{ width: '100%', borderRadius: '1rem' }} />
      </StyledChracteristic>
      <StyledChracteristic>
        <img src="/ds-13.jpg" style={{ width: '100%', borderRadius: '1rem' }} />
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
            delivering your project promptly and efficiently. We&apos;ll keep
            you updated on the progress and ensure that your project is
            completed to your satisfaction within the specified timeframe.
          </p>
        </div>
      </StyledChracteristic>
    </div>
  );
}
