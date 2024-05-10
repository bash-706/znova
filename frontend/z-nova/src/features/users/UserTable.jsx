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
      <Table columns="0.3fr 2fr 1.4fr 1.6fr 1fr 1fr 2fr 1fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Username</div>
          <div>Email</div>
          <div>Country</div>
          <div>Role</div>
          <div>Created At</div>
          <div>Active</div>
          <div>Status</div>
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
