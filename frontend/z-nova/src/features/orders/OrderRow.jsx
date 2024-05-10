import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteOrder } from './useDeleteOrder';
import {
  HiCheckBadge,
  HiEye,
  HiMiniXMark,
  HiOutlineClock,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import OrderForm from './OrderForm';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../ui/Tooltip';
import useUpdateOrder from './useUpdateOrder';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.4fr 1fr 2fr 1fr 1fr 1fr 1fr 0.3fr;
  column-gap: 2.4rem;
  align-items: center;
  /* text-align: center; */
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 3rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 0 1.2rem;
`;

const IDCellWrapper = styled.div`
  position: relative;
`;

const IDCellText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  cursor: pointer;
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

function OrderRow({ order }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const { updateOrder, isLoading: isUpdating } = useUpdateOrder();
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const {
    _id: orderId,
    customer,
    createdAt,
    service,
    price,
    status,
    paid,
  } = order;

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/users/${customer.photo}`} />
        <div style={{ textAlign: 'start' }}>{customer.name}</div>

        <IDCellWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <IDCellText>{orderId}</IDCellText>
          <Tooltip isVisible={showTooltip}>{orderId}</Tooltip>
        </IDCellWrapper>
        <div>{service?.name}</div>
        <div>{`${price}$`}</div>
        <StyledStatus>
          <span>
            {status === 'Pending' && (
              <HiOutlineClock style={{ color: 'blue' }} />
            )}
          </span>
          <span>
            {status === 'Cancelled' && <HiMiniXMark style={{ color: 'red' }} />}
          </span>
          <span>
            {status === 'Delivered' && (
              <HiCheckBadge style={{ color: 'green' }} />
            )}
          </span>
          <span>{status}</span>
        </StyledStatus>
        <div
          style={{
            background: paid ? '#35db35' : '#fc3d3d',
            color: 'white',
            padding: '0.2rem',
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
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={orderId} />
              <Menus.List id={orderId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/orders/${orderId}`)}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Edit
                </Menus.Button>
                <Modal.Open>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window>
              <ConfirmDelete
                onConfirm={() => deleteOrder(order?._id)}
                resourceName={`order`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <OrderForm
          order={order}
          formSubmitHandler={(data) => {
            updateOrder({
              data,
              orderId,
            });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default OrderRow;
