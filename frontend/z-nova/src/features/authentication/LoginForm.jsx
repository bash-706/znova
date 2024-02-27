import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

import { useLogin } from './useLogin';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Paragraph from '../../ui/Paragraph';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';

const StyledLink = styled(Link)`
  font-weight: 600;
  color: var(--color-brand-700);
`;

function LoginForm() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const { login, isLoading } = useLogin();
  const [passwordShown, setPasswordShown] = useState(false);
  const { login, isLoading } = useLogin();

  const togglePassword = () => {
    setPasswordShown((prevShown) => !prevShown);
  };

  const {
    register,
    // formState,
    handleSubmit,
    reset,
  } = useForm();
  // const { errors } = formState;

  function submit({ email_username, password }) {
    if (!email_username || !password) return;
    login({ email_username, password });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow
        label="Email or Username"
        orientation="vertical"
        // error={errors?.email_username?.message}
      >
        <Input
          type="text"
          id="email_username"
          // This makes this form better for password managers
          autoComplete="username"
          {...register('email_username', {
            required: 'This field is required',
          })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow
        type="login"
        label="Password"
        orientation="vertical"
        // error={errors?.password?.message}
      >
        <Input
          type={passwordShown ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          {...register('password', { required: 'This field is required' })}
          disabled={isLoading}
        />
        {passwordShown ? (
          <HiEyeSlash
            onClick={togglePassword}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              top: '6rem',
              right: '1rem',
            }}
          />
        ) : (
          <HiEye
            onClick={togglePassword}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              top: '6rem',
              right: '1rem',
            }}
          />
        )}
      </FormRow>
      <StyledLink
        style={{ paddingTop: '1.2rem', display: 'inline-block' }}
        to="/forgot-password"
      >
        Forgot Password?
      </StyledLink>
      <FormRow orientation="vertical">
        <Button size="large" style={{ width: '100%' }} disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRow>
      <Paragraph size="small">
        Don&#39;t have an account?{' '}
        <StyledLink to="/auth/signup">Sign Up</StyledLink>
      </Paragraph>
    </Form>
  );
}

export default LoginForm;
