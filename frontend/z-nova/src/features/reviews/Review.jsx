import styled from 'styled-components';

const StyledReview = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 0 1.2rem;
  background: #f2f4f5;
  padding: 2rem;
  border-radius: 1rem;
`;

function Review({ review }) {
  return (
    <StyledReview>
      <img
        style={{
          width: '4.5rem',
          height: '4.5rem',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        src={`http://127.0.0.1:8000/users/${review?.user?.photo}`}
        alt={review?.user?.name}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <h4 style={{ fontWeight: '500' }}>{review?.user?.name}</h4>
        <span
          style={{
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#000',
            opacity: '55%',
          }}
        >
          {new Date(review?.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <p
          style={{
            margin: '1.8rem 0 0.8rem',
            opacity: '80%',
          }}
        >
          {review?.review}
        </p>
      </div>
    </StyledReview>
  );
}

export default Review;
