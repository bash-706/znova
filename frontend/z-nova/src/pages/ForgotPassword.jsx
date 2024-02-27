import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useForgotPassword } from '../features/authentication/useForgotPassword';
import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import SpinnerMini from '../ui/SpinnerMini';
import { HiArrowLeft } from 'react-icons/hi2';

const StyledLink = styled(Link)`
  font-weight: 600;
  color: var(--color-brand-700);
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledForgotPassword = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 54rem;
  align-content: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  & form {
    box-shadow: var(--shadow-md);
  }
`;

function ForgotPassword() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function submit({ email }) {
    console.log(email);
    if (!email) return;
    forgotPassword(email);
    reset();
  }

  const { forgotPassword, status } = useForgotPassword();
  return (
    <StyledForgotPassword>
      <Form onSubmit={handleSubmit(submit)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <img src="/i-1.png" style={{ width: '10rem', height: '10rem' }} />
          <p
            style={{
              color: 'var(--color-grey-500)',
              fontSize: '1.4rem',
              textAlign: 'center',
              margin: '1.2rem 0',
            }}
          >
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <FormRow
          label="Email Address"
          orientation="vertical"
          error={errors?.email?.message}
        >
          <Input
            type="text"
            id="email"
            autoComplete="email"
            {...register('email', {
              required: 'This field is required',
            })}
            disabled={status === 'pending'}
          />
        </FormRow>
        <FormRow orientation="vertical">
          <Button
            size="large"
            style={{ width: '100%' }}
            disabled={status === 'pending'}
          >
            {status === 'pending' ? <SpinnerMini /> : 'Submit'}
          </Button>
        </FormRow>
        <FormRow>
          <StyledLink to="/auth/login">
            <HiArrowLeft />
            Back to login
          </StyledLink>
        </FormRow>
      </Form>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
