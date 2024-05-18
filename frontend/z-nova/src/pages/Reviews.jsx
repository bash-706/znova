import Row from '../ui/Row';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import ReviewTable from '../features/reviews/AccountReviewTable';
import { useUserReviews } from '../features/reviews/useUserReviews';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';

const StyledReviews = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  padding: 4rem 4rem 6rem;
`;

const StyledNoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 4rem;
`;

const StyledImage = styled.img`
  width: 20rem;
  height: 20rem;
`;

function Reviews() {
  const { user } = useUser();
  const { isLoading, reviews } = useUserReviews(user?._id);

  if (isLoading) return <Spinner />;

  return (
    <>
      {reviews?.data?.data?.length > 0 ? (
        <StyledReviews>
          <Row style={{ gap: '3rem' }}>
            <Heading
              as="h2"
              style={{
                margin: 0,
                fontWeight: 500,
                textAlign: 'center',
                textShadow: '0 0 1px rgba(0, 0, 0, 0.8)',
              }}
            >
              My Reviews
            </Heading>
            <ReviewTable reviews={reviews?.data?.data} isLoading={isLoading} />
          </Row>
        </StyledReviews>
      ) : (
        <StyledNoContent>
          <StyledImage src="sf.png" />
          <p>No Reviews Found!!</p>
        </StyledNoContent>
      )}
    </>
  );
}

export default Reviews;
