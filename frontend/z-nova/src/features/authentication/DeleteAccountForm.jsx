import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useState } from 'react';
import { HiEye, HiEyeSlash, HiTrash } from 'react-icons/hi2';
import { useDeleteAccount } from './useDeleteAccount';

// import styled from 'styled-components';

function DeleteAccountForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const { deleteAccount, isLoading: isDeleting } = useDeleteAccount();

  const togglePassword = () => {
    setPasswordShown((prevShown) => !prevShown);
  };

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function submit({ confirmPassword: password }) {
    if (!password) return;
    deleteAccount(password);
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow
        label="Confirm Password"
        orientation="vertical"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type={passwordShown ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="confirm-password"
          {...register('confirmPassword', {
            required: 'This field is required',
          })}
          disabled={isDeleting}
        />
        {passwordShown ? (
          <HiEyeSlash
            onClick={togglePassword}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              cursor: 'pointer',
              top: '5rem',
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
              cursor: 'pointer',
              top: '5rem',
              right: '1rem',
            }}
          />
        )}
      </FormRow>
      <FormRow orientation="vertical">
        <Button
          size="medium"
          variation="danger"
          disabled={isDeleting}
          style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}
        >
          <span>Delete Account</span>
          <HiTrash />
        </Button>
      </FormRow>
    </Form>
  );
}

export default DeleteAccountForm;
