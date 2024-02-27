import styled from 'styled-components';

const StyledCardUser = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1rem;
`;

const StyledCardUserImage = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  overflow: hidden;
  border-radius: 50%;
`;

const StyledUserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.5rem;
`;

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledUserName = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-800);
`;

function ReviewCard({ review }) {
  const src = `http://127.0.0.1:8000/users/${review.user.photo}`;
  return (
    <div>
      <StyledCardUser>
        <StyledCardUserImage>
          <StyledUserImage src={src} />
        </StyledCardUserImage>
        <StyledReviewInfo>
          <StyledUserInfo>
            <StyledUserName>{review?.user?.name}</StyledUserName>
            <p>24 min ago</p>
          </StyledUserInfo>
          <p>{review.review}</p>
        </StyledReviewInfo>
      </StyledCardUser>
    </div>
  );
}

export default ReviewCard;
