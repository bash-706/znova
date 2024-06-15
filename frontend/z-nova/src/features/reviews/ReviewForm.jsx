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

function ReviewForm({ formSubmitHandler, isLoading, orderId }) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit({ review }) {
    formSubmitHandler({ review, rating: 5, order: orderId });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <TextArea
          id="review"
          disabled={isLoading}
          {...register('review', { required: 'This field is required' })}
          rows="5"
          style={{
            padding: '2rem',
            resize: 'none',
            borderRadius: '1rem',
            disabled: { isLoading },
            width: '100%',
            margin: 0,
          }}
          placeholder={
            'Did you like our services? Write a review and let us know'
          }
        ></TextArea>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            position: 'absolute',
            right: '1rem',
            bottom: '1.6rem',
          }}
        >
          <StyledButton
            style={{ background: 'var(--color-brand-600)', color: '#fff' }}
          >
            Submit
          </StyledButton>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
