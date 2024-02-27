import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styled from 'styled-components';
import { useCreateReview } from './useCreateReview';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 2rem;

  & div {
    border: none;
    padding: 0;
  }
`;

function ReviewForm({ serviceId }) {
  const { createReview, isLoading } = useCreateReview();

  const { register, reset, handleSubmit } = useForm();
  // const { errors } = formState;

  function submit(review) {
    const rating = { rating: 4 };
    if (!review || !rating) return;
    createReview({ serviceId, rating, review });
    reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <FormRow
        orientation="vertical"
        // error={errors?.review?.message}
      >
        <Input
          type="text"
          id="review"
          placeholder="Write a review"
          disabled={isLoading}
          {...register('review')}
        />
      </FormRow>
      <Button variation="primary" size="small">
        Submit Review
      </Button>
    </StyledForm>
  );
}

export default ReviewForm;
