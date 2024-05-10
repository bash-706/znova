import Spinner from '../../ui/Spinner';
import AccountReviewRow from './AccountReviewRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import styled from 'styled-components';

const StyledTableHeading = styled.div`
  text-align: center;
`;

function AccountReviewTable({ reviews, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.5fr 3fr 4fr 1fr 2fr">
        <Table.Header>
          <div></div>
          <StyledTableHeading>Service</StyledTableHeading>
          <StyledTableHeading>Review</StyledTableHeading>
          <div>Rating</div>
          <StyledTableHeading>Date</StyledTableHeading>
        </Table.Header>
        <Table.Body
          data={reviews}
          render={(review) => (
            <AccountReviewRow review={review} key={review?._id} />
          )}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default AccountReviewTable;
