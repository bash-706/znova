import Spinner from '../../ui/Spinner';
import CommentRow from './CommentRow';
import { useComments } from './useComments';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function CommentTable() {
  const { isLoading, comments } = useComments();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.4fr 1.4fr 1fr 2.9fr 1.2fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Post</div>
          <div>Author</div>
          <div>Comment</div>
          <div>Parent ID</div>
          <div>Created At</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={comments}
          render={(comment) => (
            <CommentRow comment={comment} key={comment?._id} />
          )}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CommentTable;
