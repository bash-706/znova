import styled from 'styled-components';
import { useState } from 'react';

// import CreateCabinForm from "./CreateCabinForm";
import { useDeleteOrder } from './useDeleteOrder';
// import { formatCurrency } from '../../utils/helpers';
// import { HiPencil,
import {
  HiEye,
  HiPencil,
  HiPencilSquare,
  //   HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
// import { useCreatePost } from './useCreatePost';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import { useNavigate } from 'react-router-dom';
import { deleteOrder } from '../../services/apiOrders';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 1.4fr 1fr 1fr 1fr 1fr 0.3fr;
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

function OrderRow({ order }) {
  const [showForm, setShowForm] = useState(false);
  const { deletePost, isDeleting } = useDeleteOrder;
  //   const { isCreating, createPost } = useCreatePost();
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

  //   function handleDuplicate() {
  //     createPost({
  //       title: title.startsWith('Copy') ? title : `Copy of ${title}`,
  //       category,
  //       tags,
  //       image,
  //       body,
  //       caption,
  //       user,
  //       slug,
  //       createdAt,
  //     });
  //   }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/users/${customer.photo}`} />
        <div style={{ textAlign: 'start' }}>{customer.name}</div>
        <div>{service?.name}</div>
        <div>{`${price}$`}</div>
        <div>{`${status}`}</div>
        <div>{paid ? 'Paid' : 'Unpaid'}</div>
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
                  onClick={() => navigate(`/blog`)}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => navigate(`edit`)}
                >
                  Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencilSquare />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Quick Edit
                </Menus.Button>
                {/* <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => handleDuplicate()}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button> */}
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
        {/* <div> */}
        {/* <button disabled={isCreating} onClick={handleDuplicate}> */}
        {/* <HiSquare2Stack /> */}
        {/* </button> */}
        {/* <button onClick={() => setShowForm((show) => !show)}> */}
        {/* <HiPencil /> */}
        {/* </button> */}
        {/* <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}> */}
        {/* <HiTrash /> */}
        {/* </button> */}
        {/* </div> */}
      </TableRow>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
      {showForm && <p>Form</p>}
    </>
  );
}

export default OrderRow;
