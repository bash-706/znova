import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';

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
`;

function OrderForm({
  order,
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
}) {
  const { register, handleSubmit, reset } = useForm();

  function submit({ status }) {
    formSubmitHandler({
      status,
    });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow label="Status" style={{ display: 'flex' }}>
        <StyledSelect
          id="status"
          {...register('status', { required: 'This field is required' })}
          disabled={isLoading}
          defaultValue={order?.status}
        >
          {['Pending', 'Cancelled', 'Delivered'].map((option) => (
            <option key={option} value={option}>
              <span>{option}</span>
            </option>
          ))}
        </StyledSelect>
      </FormRow>
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
          Update
        </StyledButton>
      </StyledButtons>
    </Form>
  );
}

export default OrderForm;
