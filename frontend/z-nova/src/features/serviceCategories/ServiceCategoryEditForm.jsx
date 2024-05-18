import { useForm } from 'react-hook-form';
import TextArea from '../../ui/TextArea';
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
`;

function ServiceCategoryEditForm({
  btnLabel,
  initialText = '',
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
}) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit({ name }) {
    formSubmitHandler(name);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <TextArea
          id="name"
          {...register('name', { required: 'This field is required' })}
          rows="5"
          style={{
            padding: '2rem',
            resize: 'none',
            borderRadius: '1rem',
            disabled: { isLoading },
            position: 'relative',
            width: '96%',
            margin: '2rem',
            fontSize: '1.3rem',
            fontWeight: '500',
          }}
          placeholder="Edit Category Name"
        >
          {initialText}
        </TextArea>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            position: 'absolute',
            right: '3rem',
            bottom: '4rem',
          }}
        >
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
        </div>
      </div>
    </form>
  );
}

export default ServiceCategoryEditForm;
