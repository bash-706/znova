import Spinner from '../../ui/Spinner';
import ReviewRow from './ReviewRow';
import { useAllReviews } from './useAllReviews';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function CommentTable() {
  const { isLoading, reviews } = useAllReviews();
  console.log(reviews);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.5fr 2.2fr 1.4fr 2.6fr 0.5fr 1.4fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Service</div>
          <div>User</div>
          <div>Review</div>
          <div>Rating</div>
          <div>Created At</div>
          <div>Review ID</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={reviews?.data?.data}
          render={(review) => <ReviewRow review={review} key={review?._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CommentTable;
