import Row from './Row';
import Heading from './Heading';
import PostTable from '../features/posts/PostTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '1.8rem' }}>
          Manage Posts
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <PostTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
