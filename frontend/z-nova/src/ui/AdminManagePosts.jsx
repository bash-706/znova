import Row from './Row';
import Heading from './Heading';
import PostTable from '../features/posts/PostTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2.6rem' }}>
          All Posts
        </Heading>
        <p>Posts Management Page</p>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <PostTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
