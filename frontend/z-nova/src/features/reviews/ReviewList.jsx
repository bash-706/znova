import styled from 'styled-components';
import ReviewCard from './ReviewCard';
import { useReviews } from './useReviews';
import Spinner from '../../ui/Spinner';

const StyledReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
`;

function ReviewList({ serviceId }) {
  const { reviews, isLoading, error } = useReviews(serviceId);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledReviewList>
      {reviews.data.data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </StyledReviewList>
  );
}

export default ReviewList;
