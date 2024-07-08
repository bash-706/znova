import { useForm } from 'react-hook-form';
import TextArea from '../../ui/TextArea';
import styled from 'styled-components';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
  padding: 2rem;
  resize: none;
  border-radius: 1rem;
  width: 100%;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
  background: var(--color-brand-600);
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-brand-700);
  }
`;

const RatingContainer = styled.div`
  margin: 1.6rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ReviewForm({ formSubmitHandler, isLoading, orderId }) {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);

  function onSubmit({ review }) {
    formSubmitHandler({ review, rating, order: orderId });
    reset();
    setRating(0);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTextArea
        id="review"
        disabled={isLoading}
        {...register('review', { required: 'This field is required' })}
        rows="5"
        placeholder="Did you like our services? Write a review and let us know"
      />
      <RatingContainer>
        <Rating
          fractions={10}
          initialRating={rating}
          onChange={(rate) => setRating(rate)}
          emptySymbol={
            <FaRegStar
              style={{
                color: '#ffb400',
                fontSize: '3rem',
                marginRight: '1.2rem',
              }}
            />
          }
          fullSymbol={
            <FaStar
              style={{
                color: '#ffb400',
                fontSize: '3rem',
                marginRight: '1.2rem',
              }}
            />
          }
        />
      </RatingContainer>
      <StyledButton type="submit" disabled={isLoading}>
        Submit
      </StyledButton>
    </StyledForm>
  );
}

export default ReviewForm;
