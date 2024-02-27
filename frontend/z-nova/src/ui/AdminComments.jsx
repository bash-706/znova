import Row from './Row';
import Heading from './Heading';
import CommentTable from '../features/comments/CommentTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2.6rem' }}>
          All Comments
        </Heading>
        <p>Posts Comments Page</p>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <CommentTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
