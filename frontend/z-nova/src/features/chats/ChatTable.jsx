import Spinner from '../../ui/Spinner';
import ChatRow from './ChatRow';
import { useChats } from './useChats';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function CommentTable() {
  const { isLoading, chats } = useChats();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.3fr 1fr 1fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Chat Id</div>
          <div>Member 1</div>
          <div>Member 2</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={chats}
          render={(chat) => <ChatRow chat={chat} key={chat?._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CommentTable;
