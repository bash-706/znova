import Row from '../ui/Row';
import OrderTable from '../features/orders/AccountOrderTable';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import { useUserOrders } from '../features/orders/useUserOrders';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';

const StyledOrders = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  padding: 4rem 4rem 6rem;
`;

const StyledNoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 4rem;
`;

const StyledImage = styled.img`
  width: 20rem;
  height: 20rem;
`;

function Orders() {
  const { user } = useUser();
  const { isLoading, orders } = useUserOrders(user?._id);

  if (isLoading) return <Spinner />;

  return (
    <>
      {orders?.data?.length > 0 ? (
        <StyledOrders>
          <Row style={{ gap: '3rem' }}>
            <Heading
              as="h2"
              style={{
                margin: 0,
                fontWeight: 500,
                textAlign: 'center',
                textShadow: '0 0 1px rgba(0, 0, 0, 0.8)',
              }}
            >
              My Orders
            </Heading>
            <OrderTable orders={orders} isLoading={isLoading} />
          </Row>
        </StyledOrders>
      ) : (
        <StyledNoContent>
          <StyledImage src="no.png" />
          <p>No Orders Found!!</p>
        </StyledNoContent>
      )}
    </>
  );
}

export default Orders;
