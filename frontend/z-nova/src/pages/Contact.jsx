import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import FormRow from '../ui/FormRow';
import Form from '../ui/Form';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Hero from '../ui/Hero';
import { useSignup } from '../features/authentication/useSignup';

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: var(--shadow-lg);
  grid-template-rows: 1fr;
  gap: 2rem;
`;

const StyledForm = styled(Form)`
  background: var(--color-grey-0);
  /* background: linear-gradient(to bottom right, #808080 50%, #000 50%); */
  color: var(--color-grey-900);
  box-shadow: var(--shadow-lg);
  border-radius: 1rem;
  padding: 5rem;
  font-size: 1.56rem;
`;

const StyledHeading = styled.h3`
  font-size: 2.6rem;
  font-weight: 600;
  text-align: center;
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  padding: 0.4rem 0 2rem;
  text-align: center;
`;

const StyledContactRight = styled.div`
  box-shadow: var(--shadow-lg);
  background: var(--color-grey-0);
  color: var(color-grey-900);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  padding: 0 4rem;
`;

function Contact() {
  const { signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({fullName: name, email, subject, message}) {
    signup({ name, email, subject, message })
    reset();
  }

  return (
    <>
      <Hero bg="14.jpg" location="center">
        <Heading
          as="h1"
          style={{
            paddingBottom: '0.4rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          Contact Us
        </Heading>
        <p style={{ zIndex: 1 }}>We love to hear from you</p>
      </Hero>
      <StyledSection style={{ padding: '6.4rem 4.8rem 6.4rem' }}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledHeading>Say Hello!</StyledHeading>
          <StyledParagraph>We Are Always Ready To Serve Ya!</StyledParagraph>
          <FormRow label="Your Name" star="*" error={errors?.fullName?.message}>
            <Input type="text" id="fullName" placeholder="Enter Your Name"
            {...register('fullName', { required: 'This field is required' })} />
          </FormRow>
          <FormRow label="Your Email" star="*" error={errors?.email?.message}>
            <Input type="email" id="email" placeholder="Enter Your Email" {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}/>
          </FormRow>
          <FormRow label="Subject" star="*" error={errors?.subject?.message}>
            <Input type="text" id="subject" placeholder="Query Related To" 
            {...register('subject', { required: 'This field is required' })}/>
          </FormRow>
          <FormRow label="Your Message" error={errors?.message?.message}>
            <TextArea
              rows="5"
              id="message"
              style={{ resize: 'none' }}
              placeholder="Enter Your Message"
              {...register('message')}
            />
          </FormRow>
          <FormRow orientation="vertical">
            <Button
              onClick={reset}
              size="large"
              style={{
                width: '100%',
                borderRadius: '0.6rem',
                textTransform: 'uppercase',
                marginTop: '2rem',
                fontWeight: '700',
              }}
            >
              Send Message
            </Button>
          </FormRow>
        </StyledForm>
        <StyledContactRight>
          <img src="/5124556.png" />
          <StyledParagraph style={{ marginTop: '4rem' }}>
            Feel free to contact us! Our team is available 24/7 to help you. We
            will respond to your query as soon as possible.
          </StyledParagraph>
        </StyledContactRight>
      </StyledSection>
    </>
  );
}

export default Contact;
