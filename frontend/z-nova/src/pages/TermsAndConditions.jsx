import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const StyledTCS = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 4rem 12rem 4rem;
  letter-spacing: 0.2px;
  font-size: 1.6rem;
`;

function TermsAndConditions() {
  return (
    <StyledTCS>
      <Heading as="h1" style={{ textAlign: 'center', fontSize: '2.8rem' }}>
        Terms and Conditions
      </Heading>
      <Row style={{ gap: '2rem' }}>
        <p>
          Welcome to ZNova! These Terms and Conditions govern your use of
          ZNova&apos;s website and services. By accessing or using our website
          and services, you agree to comply with and be bound by these Terms and
          Conditions. Please read them carefully before using our website or
          services.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Acceptance of Terms</Heading>
        <p>
          By accessing or using ZNova&apos;s website and services, you agree to
          comply with and be bound by these Terms and Conditions, as well as our
          Privacy Policy. If you do not agree to these terms, you may not access
          or use our website or services.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Use of Website and Services</Heading>
        <p>
          <strong>a. </strong>ZNova provides a platform for users to browse,
          purchase, and inquire about digital services offered exclusively by
          our digitalists. You may use our website and services for lawful
          purposes only and in accordance with these Terms and Conditions.
        </p>
        <p>
          <strong>b. </strong>You agree that ZNova is responsible for the
          quality, accuracy, and timely delivery of all services offered on our
          platform by our digitalists.
        </p>
        <p>
          <strong>c. </strong>You agree not to use our website or services for
          any unlawful or prohibited purpose, including but not limited to
          violating any applicable laws, infringing upon the rights of others,
          or engaging in fraudulent or harmful activities.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">User Accounts</Heading>
        <p>
          <strong>a. </strong>In order to access certain features of our
          website, such as purchasing services or posting messages, you may be
          required to create an account. You agree to provide accurate, current,
          and complete information when creating your account, and to update
          your information as necessary to keep it accurate, current, and
          complete.
        </p>
        <p>
          <strong>b. </strong>You are responsible for maintaining the
          confidentiality of your account credentials and for any activity that
          occurs under your account. You agree to notify us immediately of any
          unauthorized use of your account or any other breach of security.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Becoming a Digitalist</Heading>
        <p>
          <strong>a. </strong>If you are interested in becoming a digitalist and
          offering your services on ZNova, please contact us through the contact
          form on our website. We will review your application and may approve
          you as a digitalist based on our review process.
        </p>
        <p>
          <strong>b. </strong>We reserve the right to approve or reject
          digitalist applications at our sole discretion, and we are not
          obligated to provide any explanation for our decision.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Intellectual Property</Heading>
        <p>
          <strong>a. </strong>The content and materials available on our
          website, including but not limited to text, graphics, logos, images,
          and software, are owned by or licensed to ZNova and are protected by
          copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          <strong>b. </strong>You may not modify, reproduce, distribute,
          transmit, display, perform, or create derivative works of any content
          or materials from our website without the prior written consent of
          ZNova or the respective copyright owner.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Payment and Billing</Heading>
        <p>
          <strong>a. </strong>Payment for services purchased through our website
          is processed securely by our third-party payment processor, Stripe
          Checkout. By making a purchase through ZNova, you agree to abide by
          Stripe&apos;s terms of service and privacy policy.
        </p>
        <p>
          <strong>b. </strong>We do not store or have access to your payment
          details, as all payment information is handled directly by Stripe. For
          more information about Stripe&apos;s security practices and policies,
          please refer to their website.
        </p>
        <p>
          <strong>c. </strong>
          You are responsible for providing accurate and up-to-date payment
          information during the checkout process. Once your payment is
          processed successfully, you will receive a confirmation email from
          ZNova.
        </p>
        <p>
          <strong>d. </strong> In the event of a payment dispute or issue,
          please contact us for assistance. We will work with you to resolve any
          payment-related issues in a timely manner.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">User Content</Heading>
        <p>
          <strong>a. </strong>You may have the opportunity to post, submit, or
          upload content to our website, such as reviews, comments, or messages.
          By posting or submitting user content, you grant ZNova a
          non-exclusive, royalty-free, perpetual, irrevocable, and fully
          sublicensable right to use, reproduce, modify, adapt, publish,
          translate, distribute, and display such content.
        </p>
        <p>
          <strong>b. </strong>You agree not to post or submit any content that
          is unlawful, defamatory, obscene, offensive, or otherwise
          objectionable, or that infringes upon the rights of others.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Limitation of Liability</Heading>
        <p>
          <strong>a. </strong>ZNova shall not be liable for any direct,
          indirect, incidental, special, or consequential damages arising out of
          or in any way related to your use of our website or services, even if
          we have been advised of the possibility of such damages.
        </p>
        <p>
          <strong>b. </strong> In no event shall our total liability to you
          exceed the amount paid by you for the services in question.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Imdemnification</Heading>
        <p>
          You agree to indemnify and hold harmless ZNova, its officers,
          directors, employees, and agents, from and against any claims,
          liabilities, damages, losses, or expenses arising out of or in any way
          related to your use of our website or services or your violation of
          these Terms and Conditions.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Termination</Heading>
        <p>
          We reserve the right to terminate or suspend your access to our
          website or services, without prior notice or liability, for any reason
          whatsoever, including but not limited to your breach of these Terms
          and Conditions.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Changes to Terms and Conditions</Heading>
        <p>
          We reserve the right to modify or update these Terms and Conditions at
          any time, without prior notice. Any changes will be effective
          immediately upon posting on our website. Your continued use of our
          website or services after any such changes constitutes your acceptance
          of the revised Terms and Conditions.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Contact Us</Heading>
        <p>
          If you have any questions, concerns, or requests regarding these Terms
          and Conditions, please contact us.
        </p>
        <p>
          Thank you for choosing ZNova. We strive to provide you with the best
          possible experience while using our website and services.
        </p>
      </Row>
    </StyledTCS>
  );
}

export default TermsAndConditions;
