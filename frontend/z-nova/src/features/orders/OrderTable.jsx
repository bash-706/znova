import Spinner from '../../ui/Spinner';
import OrderRow from './OrderRow';
import { useOrders } from './useOrders';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function OrderTable() {
  const { isLoading, orders } = useOrders();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.3fr 1.4fr 1fr 2fr 1fr 1fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Customer</div>
          <div>Order Id</div>
          <div>Service</div>
          <div>Price</div>
          <div>Status</div>
          <div>Payment</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={orders?.data}
          render={(order) => <OrderRow order={order} key={order?._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default OrderTable;
