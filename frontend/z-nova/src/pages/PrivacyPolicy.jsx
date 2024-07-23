import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { useEffect } from 'react';

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
          Welcome to ZNova! At ZNova, accessible from https://www.znova.com, one
          of our main priorities is the privacy of our users. We are committed
          to protecting your privacy and ensuring that your personal information
          is handled responsibly and securely. This Privacy Policy outlines the
          types of personal information we collect, how we use it, and the
          measures we take to protect it. By accessing or using ZNova&apos;s
          website and services, you agree to the terms outlined in this Privacy
          Policy.
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
          <strong>a. Personal Information: </strong>When you use our website or
          services, we may collect personal information such as your name, email
          address, contact information, and payment details.
        </p>
        <p>
          <strong>b. Service Information: </strong>We collect information about
          the services you browse, purchase, or inquire about, including the
          digitalist responsible for the service and any messages exchanged
          through our platform.
        </p>
        <p>
          <strong>c. Usage Information: </strong>We may collect information
          about your interactions with our website, such as pages visited,
          services viewed, and actions taken. This information helps us improve
          our services and user experience.
        </p>
        <p>
          <strong>d. Device Information: </strong>We may collect information
          about the device you use to access our website, including device type,
          operating system, IP address, and browser type.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">How we use your information?</Heading>
        <p>
          <strong>a. Provide Services: </strong>We use your personal information
          to provide the services you request, including processing orders,
          communicating with digitalists, and facilitating payments through our
          payment processor, Tazapay.
        </p>
        <p>
          <strong>b. Personalization: </strong>We may use your information to
          personalize your experience on our website, such as recommending
          services based on your browsing history or preferences.
        </p>
        <p>
          <strong>c. Communications: </strong>We may use your contact
          information to send you important updates, newsletters, promotional
          offers, or other communications related to our services. You can
          opt-out of receiving promotional emails at any time.
        </p>
        <p>
          <strong>d. Ananlytics: </strong>We use usage information and analytics
          tools to analyze trends, track user behavior, and improve our
          website&apos;s performance and functionality.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Information Sharing</Heading>
        <p>
          <strong>a. With Digitalists: </strong>We may share your information
          with digitalists to facilitate the provision of services, including
          sharing your contact information and service preferences.
        </p>
        <p>
          <strong>b. Service Providers: </strong>We may share your information
          with third-party service providers who assist us in operating our
          website, processing payments, or conducting business activities on our
          behalf.
        </p>
        <p>
          <strong>c. Legal Compliance: </strong>We may disclose your information
          as required by law, regulation, or legal process, or if we believe
          disclosure is necessary to protect our rights, property, or safety, or
          that of others.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Data Security</Heading>
        <p>
          <strong>a. Security Measures: </strong>We implement appropriate
          technical and organizational measures to protect your personal
          information against unauthorized access, disclosure, alteration, or
          destruction.
        </p>
        <p>
          <strong>b. Encryption: </strong>We use encryption technology to secure
          sensitive data, such as payment information, during transmission over
          the internet.
        </p>
        <p>
          <strong>c. Access Controls: </strong>Access to your personal
          information is restricted to authorized personnel only, and we
          regularly review our security practices to ensure the confidentiality
          and integrity of your data.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Your Rights</Heading>
        <p>
          <strong>a. Access and Correction: </strong>You have the right to
          access, update, or correct your personal information stored on our
          website. You can do this by logging into your account or contacting us
          directly.
        </p>
        <p>
          <strong>b. Data Portability: </strong>Upon request, we will provide
          you with a copy of your personal information in a structured,
          machine-readable format.
        </p>
        <p>
          <strong>c. Data Retention: </strong>We retain your personal
          information for as long as necessary to fulfill the purposes outlined
          in this Privacy Policy, unless a longer retention period is required
          or permitted by law.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Third Party Links</Heading>
        <p>
          Our website may contain links to third-party websites or services that
          are not operated or controlled by ZNova. This Privacy Policy does not
          apply to third-party websites, and we are not responsible for their
          privacy practices or content.
        </p>
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
        <p>
          Thank you for choosing ZNova. We are committed to safeguarding your
          privacy and providing you with the best possible experience.
        </p>
      </Row>
    </StyledPrivacy>
  );
}

export default PrivacyPolicy;
