import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useResetPassword } from '../features/authentication/useResetPassword';
import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import SpinnerMini from '../ui/SpinnerMini';
import { useParams } from 'react-router-dom';

// const StyledLink = styled(Link)`
//   font-weight: 600;
//   color: var(--color-brand-700);
//   display: flex;
//   gap: 1rem;
//   align-items: center;
//   justify-content: center;
//   margin-top: 1rem;
// `;

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
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { resetToken } = useParams();
  const { resetPassword, status } = useResetPassword();

  function submit({ password, passwordConfirm }) {
    if (!password || !passwordConfirm) return;
    console.log(password, passwordConfirm, resetToken);
    resetPassword({ resetToken, password, passwordConfirm });
    reset();
  }

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
          <img src="/r-1.png" style={{ width: '10rem', height: '10rem' }} />
          <p
            style={{
              color: 'var(--color-grey-500)',
              fontSize: '1.4rem',
              textAlign: 'center',
              margin: '1.2rem 0',
            }}
          >
            Enter your new password and confirm new password for a fresh start.
          </p>
        </div>
        <FormRow
          label="New Password (min 8 characters)"
          orientation="vertical"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
            disabled={status === 'pending'}
          />
        </FormRow>
        <FormRow
          label="Confirm Password"
          orientation="vertical"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            autoComplete="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
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
            {status === 'pending' ? <SpinnerMini /> : 'Reset Password'}
          </Button>
        </FormRow>
      </Form>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
