import Spinner from '../../ui/Spinner';
import PostCategoryRow from './PostCategoryRow';
import { usePostCategories } from './usePostCategories';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Heading from '../../ui/Heading';

function PostCategoryTable() {
  const { isLoading, postCategories } = usePostCategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Heading
        as="h1"
        style={{ fontWeight: '500', fontSize: '2rem', marginBottom: '2rem' }}
      >
        All Post Categories
      </Heading>
      <Menus>
        <Table columns="2fr 2fr 0.3fr">
          <Table.Header>
            <div>Name</div>
            <div>Created At</div>
            <div> </div>
          </Table.Header>
          <Table.Body
            data={postCategories}
            render={(postCategory) => (
              <PostCategoryRow
                postCategory={postCategory}
                key={postCategory?._id}
              />
            )}
          ></Table.Body>
        </Table>
      </Menus>
    </div>
  );
}

export default PostCategoryTable;
