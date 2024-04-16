import Spinner from '../../ui/Spinner';
import ServiceRow from './ServiceRow';
import { useServices } from './useServices';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function ServiceTable() {
  const { isLoading, services } = useServices('full');

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.3fr 1.4fr 1fr 1fr 1fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Title</div>
          <div>Author</div>
          <div>Category</div>
          <div>Ratings</div>
          <div>Price</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={services?.data}
          render={(service) => (
            <ServiceRow service={service} key={service?._id} />
          )}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default ServiceTable;
