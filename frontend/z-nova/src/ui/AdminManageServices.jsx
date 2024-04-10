import Row from './Row';
import Heading from './Heading';
import ServiceTable from '../features/services/ServiceTable';

function AdminManagePosts() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '1.8rem' }}>
          Manage Services
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <ServiceTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
