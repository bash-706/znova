import Spinner from '../../ui/Spinner';
import PostRow from './PostRow';
import { usePosts } from './usePosts';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function PostTable() {
  const { isLoading, posts } = usePosts('full');

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.3fr 1.4fr 1fr 1fr 1fr 1.2fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Title</div>
          <div>Author</div>
          <div>Category</div>
          <div>Tags</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={posts?.data}
          render={(post) => <PostRow post={post} key={post?._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default PostTable;
