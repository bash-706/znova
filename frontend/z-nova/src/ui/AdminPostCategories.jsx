import Row from './Row';
import Heading from './Heading';
import PostCategoryTable from '../features/postCategories/PostCategoryTable';
import CategoryForm from '../features/postCategories/PostCategoryForm';

function AdminManagePosts() {
  return (
    <>
      {/* <Row type="horizontal" style={{ justifyContent: 'center' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          All Post Categories
        </Heading>
      </Row> */}

      <Row style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
        <CategoryForm />
        <PostCategoryTable />
      </Row>
    </>
  );
}

export default AdminManagePosts;
