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
  cursor: pointer;
  margin: auto;

  &:hover img {
    filter: brightness(0.7);
  }

  &:hover::after {
    content: 'Upload a Photo';
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
`;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [photo, setPhoto] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(
    'http://127.0.0.1:8000/users/default.jpg',
  );

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
  }) {
    signup(
      { name, email, photo, username, password, passwordConfirm },
      {
        onSettled: () => {
          setAvatarSrc('http://127.0.0.1:8000/users/default.jpg');
          setPhoto(null);
          reset();
        },
      },
    );
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <FormUserPhotoContainer>
          <FormUserPhoto src={avatarSrc} />
          <FileInput
            style={{
              position: 'absolute',
              cursor: 'pointer',
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
          type="password"
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
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <Paragraph size="small">
        Already have an account? <StyledLink to="/auth/login">Login</StyledLink>
      </Paragraph>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {!isLoading ? 'Signup' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
