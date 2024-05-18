import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSignup } from './useSignup';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Paragraph from '../../ui/Paragraph';
import { Link } from 'react-router-dom';
import SpinnerMini from '../../ui/SpinnerMini';
import FileInput from '../../ui/FileInput';
import { useState } from 'react';
import countryOptions from '../../utils/countryOptions';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

// Email regex: /\S+@\S+\.\S+/

const StyledLink = styled(Link)`
  font-weight: 600;
  color: var(--color-brand-700);
`;

const FormUserPhotoContainer = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
  margin: auto;

  &:hover img {
    filter: ${(props) =>
      props.isLoading ? 'brightness(1)' : 'brightness(0.7)'};
  }

  &:hover::after {
    content: ${(props) => (props.isLoading ? '""' : '"Upload a Photo"')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    opacity: 1;
    text-align: center;
  }
`;

const FormUserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
`;

const StyledSelect = styled.select`
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;

function SignupForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const { signup, status } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [photo, setPhoto] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(
    'http://127.0.0.1:8000/users/default.jpg',
  );
  const isLoading = status === 'pending';

  const togglePassword = () => {
    setPasswordShown((prevShown) => !prevShown);
  };

  const togglePasswordConfirm = () => {
    setPasswordConfirmShown((prevShown) => !prevShown);
  };

  function handleChangePhoto(e) {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
    setPhoto(selectedPhoto);
  }

  function onSubmit({
    fullName: name,
    email,
    username,
    password,
    passwordConfirm,
    country,
  }) {
    signup(
      { name, email, photo, username, password, passwordConfirm, country },
      {
        onSettled: () => {
          setAvatarSrc('http://127.0.0.1:8000/users/default.jpg');
          setPhoto(null);
          reset();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <FormUserPhotoContainer isLoading={isLoading}>
          <FormUserPhoto isLoading={isLoading} src={avatarSrc} />
          <FileInput
            style={{
              position: 'absolute',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '10',
              opacity: '0',
            }}
            id="avatar"
            accept="image/*"
            onChange={handleChangePhoto}
            disabled={isLoading}
          />
        </FormUserPhotoContainer>
      </FormRow>

      <FormRow
        type="signup"
        label="Full name"
        error={errors?.fullName?.message}
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isLoading}
          {...register('username', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Username must contain atleast 6 chracters',
            },
            maxLength: {
              value: 30,
              message: 'Username cannot have more than 30 chracters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type={passwordShown ? 'text' : 'password'}
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
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
              cursor: 'pointer',
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
              cursor: 'pointer',
            }}
          />
        )}
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type={passwordConfirmShown ? 'text' : 'password'}
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
        {passwordConfirmShown ? (
          <HiEyeSlash
            onClick={togglePasswordConfirm}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              top: '6rem',
              right: '1rem',
              cursor: 'pointer',
            }}
          />
        ) : (
          <HiEye
            onClick={togglePasswordConfirm}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              top: '6rem',
              right: '1rem',
              cursor: 'pointer',
            }}
          />
        )}
      </FormRow>
      <FormRow label="Country" error={errors?.country?.message}>
        <StyledSelect
          disabled={isLoading}
          id="country"
          {...register('country', { required: 'This field is required' })}
        >
          <option value="">Select country</option>

          {countryOptions.map((option) => (
            <option key={option.name} value={option.name}>
              <span>{option.name}</span>
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <Paragraph size="small">
        Already have an account? <StyledLink to="/auth/login">Login</StyledLink>
      </Paragraph>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Signup'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
