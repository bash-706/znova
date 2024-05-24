import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdatePassword } from './useUpdatePassword';
import { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

function UpdatePasswordForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { updatePassword, isUpdating } = useUpdatePassword();
  const { errors } = formState;

  const togglePassword = () => {
    setPasswordShown((prevShown) => !prevShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown((prevShown) => !prevShown);
  };

  const toggleNewPassword = () => {
    setNewPasswordShown((prevShown) => !prevShown);
  };

  function onSubmit({ currentPassword, password, passwordConfirm }) {
    if (!currentPassword || !password || !passwordConfirm) return;
    updatePassword({ currentPassword, password, passwordConfirm });
    reset();
    // updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.currentPassword?.message}
      >
        <Input
          type={passwordShown ? 'text' : 'password'}
          id="currentPassword"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('currentPassword', {
            required: 'This field is required',
            // minLength: {
            //   value: 8,
            //   message: 'Password needs a minimum of 8 characters',
            // },
          })}
        />
        {passwordShown ? (
          <HiEyeSlash
            onClick={togglePassword}
            style={{
              width: '18px',
              height: '18px',
              position: 'absolute',
              top: '0rem',
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
              top: '5rem',
              right: '1rem',
              cursor: 'pointer',
            }}
          />
        )}
      </FormRow>

      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type={newPasswordShown ? 'text' : 'password'}
          id="password"
          autoComplete="password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
        {newPasswordShown ? (
          <HiEyeSlash
            onClick={toggleNewPassword}
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
            onClick={toggleNewPassword}
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
          type={confirmPasswordShown ? 'text' : 'password'}
          autoComplete="confirm-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
        {confirmPasswordShown ? (
          <HiEyeSlash
            onClick={toggleConfirmPassword}
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
            onClick={toggleConfirmPassword}
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
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
