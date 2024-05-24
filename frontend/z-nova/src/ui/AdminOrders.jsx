import Row from './Row';
import Heading from './Heading';
import OrderTable from '../features/orders/OrderTable';

function AdminOrders() {
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Manage Orders
        </Heading>
      </Row>

      <Row style={{ justifyContent: 'flex-start' }}>
        <OrderTable />
      </Row>
    </>
  );
}

export default AdminOrders;
