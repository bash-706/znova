import styled from 'styled-components';
import ReviewForm from './ReviewForm';
import { useCreateReview } from './useCreateReview';
import { useUnreviewedOrders } from './useUnreviewedOrders';
import Review from './Review';
import Heading from '../../ui/Heading';

const StyledReviewContainer = styled.section`
  margin-top: 4rem;
`;

const StyledMainReviews = styled.section`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function ReviewsContainer({ serviceId, reviews }) {
  const { createReview, isLoading: isCreating } = useCreateReview();
  const unreviewedOrders = useUnreviewedOrders(serviceId);
  const orders = unreviewedOrders?.unreviewedOrders?.data?.orders;

  const addReviewHandler = (value) => {
    createReview({
      serviceId,
      review: value.review,
      rating: value.rating,
      order: value.order,
    });
  };

  return (
    <StyledReviewContainer>
      <Heading as="h3" style={{ marginBottom: '2rem', fontWeight: 600 }}>
        User Reviews
      </Heading>
      {orders && orders.length > 0 && (
        <ReviewForm
          formSubmitHandler={(value) => addReviewHandler(value)}
          isLoading={isCreating}
          styles={{ width: '100%', margin: 0 }}
          orderId={orders?.at(0)?._id}
        />
      )}
      <StyledMainReviews>
        {reviews?.map((review) => (
          <Review key={review?._id} review={review} />
        ))}
      </StyledMainReviews>
    </StyledReviewContainer>
  );
}

export default ReviewsContainer;
