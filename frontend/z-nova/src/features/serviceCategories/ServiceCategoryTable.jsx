import Spinner from '../../ui/Spinner';
import ServiceCategoryRow from './ServiceCategoryRow';
import { useServiceCategories } from './useServiceCategories';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Heading from '../../ui/Heading';

function ServiceCategoryTable() {
  const { isLoading, serviceCategories } = useServiceCategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Heading
        as="h1"
        style={{ fontWeight: '500', fontSize: '2rem', marginBottom: '2rem' }}
      >
        All Service Categories
      </Heading>
      <Menus>
        <Table columns="2fr 2fr 0.3fr">
          <Table.Header>
            <div>Name</div>
            <div>Created At</div>
            <div> </div>
          </Table.Header>
          <Table.Body
            data={serviceCategories}
            render={(serviceCategory) => (
              <ServiceCategoryRow
                serviceCategory={serviceCategory}
                key={serviceCategory?._id}
              />
            )}
          ></Table.Body>
        </Table>
      </Menus>
    </div>
  );
}

export default ServiceCategoryTable;
