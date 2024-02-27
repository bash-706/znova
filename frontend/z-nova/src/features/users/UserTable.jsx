import Spinner from '../../ui/Spinner';
import UserRow from './UserRow';
import { useUsers } from './useUsers';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function UserTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.3fr 1fr 1fr 2fr 1fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Username</div>
          <div>Name</div>
          <div>Email</div>
          <div>Status</div>
          <div>Role</div>
          <div>Country</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user?._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default UserTable;
