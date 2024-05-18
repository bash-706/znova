import styled from 'styled-components';

import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import { useUser } from '../features/authentication/useUser';
import { useOrder } from '../features/orders/useOrder';
import { useNavigate, useParams } from 'react-router-dom';
import OrderDataBox from '../features/orders/OrderDataBox';
import { useEffect } from 'react';
// import Checkbox from '../ui/Checkbox';
// import { formatCurrency } from '../utils/helpers';

// const Box = styled.div`
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

const StyledOrder = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 6.4rem 8rem 6.4rem;
`;

function Order() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { orderId } = useParams();
  const { order, isLoading } = useOrder(orderId);

  useEffect(() => {
    if (
      !isLoading &&
      order &&
      user?.role === 'user' &&
      order?.data?.customer?._id !== user?._id
    ) {
      navigate('/home', { replace: true });
    }
  }, [isLoading, order, user, navigate]);

  if (isLoading) return <Spinner />;

  if (user?.role !== 'user' || order?.data?.customer?._id === user?._id) {
    return (
      <StyledOrder>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Order Status
        </Heading>
        <OrderDataBox order={order} />
      </StyledOrder>
    );
  } else {
    navigate('/home', { replace: true });
    return null;
  }
}

export default Order;
