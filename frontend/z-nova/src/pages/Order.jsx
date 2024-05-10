import styled from 'styled-components';

import Heading from '../ui/Heading';
// import ButtonGroup from '../ui/ButtonGroup';
import Spinner from '../ui/Spinner';

import { useMoveBack } from '../hooks/useMoveBack';
import { useOrder } from '../features/orders/useOrder';
import { useParams } from 'react-router-dom';
import OrderDataBox from '../features/orders/OrderDataBox';
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
  const { orderId } = useParams();
  const { order, isLoading } = useOrder(orderId);

  if (isLoading) return <Spinner />;

  const { _id, price, status, paid, createdAt, customer, service } =
    order?.data;

  return (
    <StyledOrder>
      <Heading as="h1" style={{ textAlign: 'center' }}>
        Order Status
      </Heading>
      <OrderDataBox order={order} />

      {/*
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup> */}
    </StyledOrder>
  );
}

export default Order;
