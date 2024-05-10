import Row from './Row';
import Heading from './Heading';
import ReviewTable from '../features/reviews/ReviewTable';

function AdminReviews() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          All Reviews
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <ReviewTable />
      </Row>
    </>
  );
}

export default AdminReviews;
