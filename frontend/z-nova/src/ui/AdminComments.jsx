import Row from './Row';
import Heading from './Heading';
import CommentTable from '../features/comments/CommentTable';

function AdminComments() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          All Comments
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <CommentTable />
      </Row>
    </>
  );
}

export default AdminComments;
