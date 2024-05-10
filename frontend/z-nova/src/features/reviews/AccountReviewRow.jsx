import styled from 'styled-components';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 3fr 4fr 1fr 2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 0 1.2rem;
`;

function AccountReviewRow({ review }) {
  const { createdAt, service, review: userReview, rating } = review;

  return (
    <TableRow role="row">
      <Img src={`http://127.0.0.1:8000/services/${service?.imageCover}`} />
      <div>{service?.name}</div>
      <div>{userReview}</div>
      <div>⭐ {rating}</div>
      <div>
        {new Date(createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: 'numeric',
        })}
      </div>
    </TableRow>
  );
}

export default AccountReviewRow;
