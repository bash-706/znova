import styled from 'styled-components';
import {
  HiCheckBadge,
  HiEye,
  HiMiniXMark,
  HiOutlineClock,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 1fr 2fr 1fr 2fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  /* text-align: center; */
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function AccountOrderRow({ order }) {
  const navigate = useNavigate();

  const { _id: orderId, createdAt, service, price, status, paid } = order;

  return (
    <TableRow role="row">
      <div>{orderId}</div>
      <div>{service?.name}</div>
      <div>{`${price}$`}</div>
      <StyledStatus>
        <span>
          {status === 'Pending' && <HiOutlineClock style={{ color: 'blue' }} />}
        </span>
        <span>
          {status === 'Cancelled' && (
            <HiMiniXMark style={{ color: '#fc3d3d' }} />
          )}
        </span>
        <span>
          {status === 'Delivered' && (
            <HiCheckBadge style={{ color: '#35db35' }} />
          )}
        </span>
        <span>{status}</span>
      </StyledStatus>
      <div
        style={{
          background: paid ? '#35db35' : '#fc3d3d',
          color: 'white',
          padding: '0.2rem 0.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4rem',
          outline: 'none',
          border: 'none',
        }}
      >
        {paid ? 'Paid' : 'Unpaid'}
      </div>
      <div>
        {new Date(order?.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: 'numeric',
        })}
      </div>
      <button
        onClick={() => navigate(`/orders/${orderId}`)}
        style={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          outline: 'none',
          border: 'none',
          borderRadius: '4rem',
          background: 'blue',
          color: '#fff',
        }}
      >
        <span>
          <HiEye />
        </span>
        <span>View</span>
      </button>
    </TableRow>
  );
}

export default AccountOrderRow;
