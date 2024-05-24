import Row from './Row';
import Heading from './Heading';
import UserTable from '../features/users/UserTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          All Users
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <UserTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
