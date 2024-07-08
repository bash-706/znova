import styled from 'styled-components';
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

function ReviewsContainer({ reviews }) {
  return (
    <StyledReviewContainer>
      <StyledMainReviews>
        <Heading as="h3" style={{ marginBottom: '2rem', fontWeight: 600 }}>
          User Reviews
        </Heading>
        {reviews?.map((review) => (
          <Review key={review?._id} review={review} />
        ))}
      </StyledMainReviews>
    </StyledReviewContainer>
  );
}

export default ReviewsContainer;
