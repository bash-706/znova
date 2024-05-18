import Row from './Row';
import PostCategoryTable from '../features/postCategories/PostCategoryTable';
import CategoryForm from '../features/postCategories/PostCategoryForm';

function AdminManagePosts() {
  return (
    <Row style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
      <CategoryForm />
      <PostCategoryTable />
    </Row>
  );
}

export default AdminManagePosts;
