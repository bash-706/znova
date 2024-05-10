import styled from 'styled-components';
import { format } from 'date-fns';
import {
  HiOutlineBolt,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { IoKeyOutline } from 'react-icons/io5';
import { BiCoinStack } from 'react-icons/bi';
import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import { formatCurrency } from '../../utils/helpers';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import Row from '../../ui/Row';

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-red-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-red-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function OrderDataBox({ order }) {
  const {
    _id,
    price,
    status,
    paid,
    createdAt,
    customer: { photo, name, country, email, username },
    service: { name: serviceName },
  } = order?.data;

  const moveBack = useMoveBack();

  return (
    <StyledBookingDataBox>
      {/* <Header>
        <div>
          <HiComputerDesktop />
          <p>{serviceName}</p>
        </div>

        <p>{formatCurrency(price)}</p>
      </Header> */}

      <Section>
        <Row type="horizontal">
          <Heading as="h3" style={{ marginBottom: '2rem' }}>
            Customer Details
          </Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <User>
          <img
            src={`http://127.0.0.1:8000/users/${photo}`}
            style={{
              maxWidth: '3rem',
              borderRadius: '50%',
              outline: '1.2px solid var(--color-grey-600)',
            }}
          />
          <p>{name}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>{username}</p>
        </User>
        <DataItem icon={<HiOutlineHomeModern />} label="Country">
          {country}
          <Flag
            src={`/flags/${country?.toLowerCase()}.png`}
            alt={`Flag of ${country}`}
          />
        </DataItem>
        <Heading as="h3" style={{ margin: '2rem 0' }}>
          Order Details
        </Heading>
        <DataItem icon={<IoKeyOutline />} label="Order ID">
          {_id}
        </DataItem>
        <DataItem icon={<HiOutlineCurrencyDollar />} label="Price">
          {formatCurrency(price)}
        </DataItem>
        <DataItem icon={<HiOutlineClock />} label="Date">
          {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}
        </DataItem>
        <DataItem icon={<HiOutlineBolt />} label="Status">
          {status}
        </DataItem>
        <DataItem icon={<BiCoinStack />} label="Payment">
          {paid ? 'Paid' : 'Unpaid'}
        </DataItem>
      </Section>

      <Footer>
        <p>Ordered {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default OrderDataBox;
