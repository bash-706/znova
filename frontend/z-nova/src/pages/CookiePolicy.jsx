import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const StyledPrivacy = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 4rem 12rem 4rem;
  letter-spacing: 0.2px;
  font-size: 1.6rem;
`;

function PrivacyPolicy() {
  return (
    <StyledPrivacy>
      <Heading as="h1" style={{ textAlign: 'center', fontSize: '2.8rem' }}>
        Cookie Policy
      </Heading>

      <Row style={{ gap: '2rem' }}>
        <p>
          Welcome to ZNova! This Cookie Policy explains how we use cookies on
          our website to enhance your browsing experience and provide you with
          personalized services. By using our website, you consent to the use of
          cookies as described in this policy.
        </p>
      </Row>

      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">What are Cookies?</Heading>
        <p>
          Cookies are small text files that are stored on your device when you
          visit a website. They are widely used to make websites work more
          efficiently, improve user experience, and provide information to
          website owners.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">How We Use Cookies</Heading>
        <p>
          <strong>a. Authentication: </strong>We use cookies to authenticate
          users and ensure secure access to our website. This includes using
          cookies to log users in and maintain their login sessions.
        </p>
        <p>
          <strong>b. Personalization: </strong>Cookies help us personalize your
          experience on our website by remembering your preferences, such as
          language settings or customized content.
        </p>
        <p>
          <strong>c. Analytics: </strong>We use cookies to collect information
          about how you interact with our website, such as pages visited, time
          spent on each page, and navigation patterns. This helps us analyze and
          improve the performance and usability of our website.
        </p>
        <p>
          <strong>d. Advertisement: </strong>We may use cookies to deliver
          targeted advertising based on your interests and browsing behavior.
          These cookies may be used by third-party advertisers to display
          relevant ads on our website.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Managing Cookies</Heading>
        <p>
          Most web browsers allow you to control cookies through their settings.
          You can usually set your browser to block or delete cookies, or to
          alert you when cookies are being sent. However, please note that
          blocking or deleting cookies may affect your experience on our website
          and may prevent certain features from working properly.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Changes to the Cookie Policy</Heading>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by posting the updated policy on our website.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Contact Us</Heading>
        <p>
          If you have any questions, concerns, or requests regarding this Cookie
          Policy or our use of cookies, please contact us
        </p>
        <p>
          Thank you for choosing ZNova. We hope you enjoy your experience on our
          website!
        </p>
      </Row>
    </StyledPrivacy>
  );
}

export default PrivacyPolicy;
