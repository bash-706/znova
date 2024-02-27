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
        Privacy Policy
      </Heading>

      <Row style={{ gap: '2rem' }}>
        <p>
          At Znova, accessible from https://znova.com, one of our main
          priorities is the privacy of our users. This Privacy Policy document
          conatains types of information that is collected and recorded by ZNova
          and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do no hestitate to contact us.
        </p>
        <p>
          The Privacy Policy applies only to our online activities and is valid
          for users to our website with regards to the information that they
          shared and collect in ZNova. This policy is not applicable to any
          information collected offline or via channels other than this.
        </p>
      </Row>

      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Consent</Heading>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Information we collect</Heading>
        <p>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, it will be made clear to you
          at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may recieve additional information
          about you such as your name, email address, phone number, the contents
          of the message and attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <p>
          When you register for an account at Znova, we may ask your contact
          information, including items such as your full name, email address,
          and username.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">How we use your information?</Heading>
        <p>We use the information we collect in various ways, including to:</p>
        <ul
          style={{
            marginLeft: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <li style={{ listStyle: 'disc' }}>
            Provide, operate, and maintain our website
          </li>
          <li style={{ listStyle: 'disc' }}>
            Improve, personalize, and expand our website
          </li>
          <li style={{ listStyle: 'disc' }}>
            Understand and analyze how you use our website
          </li>
          <li style={{ listStyle: 'disc' }}>
            Develop new services, features and functionalities
          </li>
          <li style={{ listStyle: 'disc' }}>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes.
          </li>
          <li style={{ listStyle: 'disc' }}>Send you emails</li>
          <li style={{ listStyle: 'disc' }}>Find and prevent fraud</li>
        </ul>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Children&apos;s Information</Heading>
        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          ZNova does not knowingly collect any Personal Identifiable Information
          from children under the age of 13. If you think that your child
          provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Changes to the Privacy Policy</Heading>
        <p>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Contact Us</Heading>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do
          not hestitate to contact us.
        </p>
      </Row>
    </StyledPrivacy>
  );
}

export default PrivacyPolicy;
