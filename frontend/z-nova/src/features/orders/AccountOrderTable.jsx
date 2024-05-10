import Spinner from '../../ui/Spinner';
import AccountsOrderRow from './AccountOrderRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import styled from 'styled-components';

const StyledTableHeading = styled.div`
  text-align: center;
`;

function AccountOrderTable({ orders, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="3fr 3fr 1fr 2fr 1fr 2fr 1fr">
        <Table.Header>
          <StyledTableHeading>Order Id</StyledTableHeading>
          <StyledTableHeading>Service</StyledTableHeading>
          <StyledTableHeading>Price</StyledTableHeading>
          <StyledTableHeading>Status</StyledTableHeading>
          <StyledTableHeading> Payment</StyledTableHeading>
          <StyledTableHeading>Date</StyledTableHeading>
          <StyledTableHeading>Action</StyledTableHeading>
        </Table.Header>
        <Table.Body
          data={orders?.data}
          render={(order) => (
            <AccountsOrderRow order={order} key={order?._id} />
          )}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default AccountOrderTable;
