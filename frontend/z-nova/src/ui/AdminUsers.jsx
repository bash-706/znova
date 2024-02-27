import Row from './Row';
import Heading from './Heading';
import UserTable from '../features/users/UserTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2.6rem' }}>
          All Users
        </Heading>
        <p>Users Management Page</p>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <UserTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
