import Row from './Row';
import ServiceCategoryTable from '../features/serviceCategories/ServiceCategoryTable';
import CategoryForm from '../features/serviceCategories/ServiceCategoryForm';

function AdminManagePosts() {
  return (
    <Row style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
      <CategoryForm />
      <ServiceCategoryTable />
    </Row>
  );
}

export default AdminManagePosts;
