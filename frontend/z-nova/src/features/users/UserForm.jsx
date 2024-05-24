import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import countryOptions from '../../utils/countryOptions';
// import Paragraph from '../../ui/Paragraph';
// import SpinnerMini from '../../ui/SpinnerMini';

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StyledSelect = styled.select`
  cursor: pointer;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 100%;
`;

function UserForm({
  btnLabel,
  user,
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
}) {
  //   const { login, isLoading } = useLogin();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function submit({ name, email, username, country, role }) {
    formSubmitHandler({
      name,
      email,
      username,
      country,
      role,
    });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
      >
        <FormRow
          label="Name"
          error={errors?.name?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="name"
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            {...register('name', {
              required: 'This field is required',
            })}
            disabled={isLoading}
            defaultValue={user?.name}
          />
        </FormRow>
        <FormRow
          label="Username"
          orientation="vertical"
          error={errors?.username?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="username"
            {...register('username', { required: 'This field is required' })}
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            disabled={isLoading}
            defaultValue={user?.username}
          />
        </FormRow>
        <FormRow
          label="Email"
          orientation="vertical"
          error={errors?.email?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="email"
            id="email"
            {...register('email', { required: 'This field is required' })}
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            disabled={isLoading}
            defaultValue={user?.email}
          />
        </FormRow>
        <FormRow
          label="Country"
          error={errors?.country?.message}
          style={{ display: 'flex' }}
        >
          <StyledSelect
            id="country"
            {...register('country', { required: 'This field is required' })}
            disabled={isLoading}
            defaultValue={user?.country}
          >
            <option value="">Select country</option>

            {countryOptions.map((option) => (
              <option key={option.name} value={option.name}>
                <span>{option.name}</span>
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow
          label="Role"
          error={errors?.role?.message}
          style={{ display: 'flex' }}
        >
          <StyledSelect
            id="role"
            {...register('role', { required: 'This field is required' })}
            disabled={isLoading}
            defaultValue={user?.role}
          >
            <option value="">Select role</option>

            {['user', 'digitalist', 'admin'].map((option) => (
              <option key={option} value={option}>
                <span>{option}</span>
              </option>
            ))}
          </StyledSelect>
        </FormRow>
      </div>
      <StyledButtons>
        {formCancelHandler && (
          <StyledButton
            onClick={formCancelHandler}
            style={{ background: 'var(--color-grey-200)' }}
          >
            Cancel
          </StyledButton>
        )}

        <StyledButton
          style={{ background: 'var(--color-brand-600)', color: '#fff' }}
        >
          {btnLabel}
        </StyledButton>
      </StyledButtons>
    </Form>
  );
}

export default UserForm;
