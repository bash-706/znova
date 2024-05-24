import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteService } from './useDeleteService';
import { useUpdateService } from './useUpdateService';
import { useUser } from '../authentication/useUser';
import {
  HiEye,
  HiPencil,
  HiPencilSquare,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
import { useCreateService } from './useCreateService';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import { useNavigate } from 'react-router-dom';
import ServiceForm from './ServiceForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.4fr 1fr 1fr 1fr 1fr 1fr 0.3fr;
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
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 0 1.2rem;
`;

function ServiceRow({ service }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteService, isDeleting } = useDeleteService();
  const { createService, isCreating } = useCreateService();
  const { updateService, isUpdating } = useUpdateService();
  const loggedInUser = useUser();
  const navigate = useNavigate();
  const {
    _id: serviceId,
    name,
    createdAt,
    category,
    imageCover,
    description,
    price,
    ratingsAverage,
    ratingsQuantity,
    user,
    slug,
    serviceCategory,
    duration,
    images,
    packages,
  } = service;

  function handleDuplicate() {
    createService({
      name: name.startsWith('Copy') ? name : `Copy of ${name}`,
      description,
      imageCover,
      serviceCategory,
      price,
      duration,
      category,
      packages,
      images,
      user: loggedInUser?.user?._id,
      slug,
      createdAt,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/services/${imageCover}`} />
        <div style={{ textAlign: 'start' }}>{name}</div>
        <div>{user?.username}</div>
        <div style={{ textTransform: 'capitalize' }}>
          {category.split('-').join(' ')}
        </div>
        <div>{`${ratingsAverage} (${ratingsQuantity})`}</div>
        <div>{`${price}$`}</div>
        <div>
          {new Date(createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
          })}
        </div>
        <div>
          <Modal>
            {/* <button onClick={() => setShowForm((show) => !show)}>Edit</button> */}
            <Menus.Menu>
              <Menus.Toggle id={serviceId} />
              <Menus.List id={serviceId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/services/${slug}`)}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => navigate(`edit/${slug}`)}
                >
                  Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencilSquare />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Quick Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => handleDuplicate()}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window>
              <ConfirmDelete
                onConfirm={() => deleteService(serviceId)}
                resourceName={`service`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <ServiceForm
          service={service}
          formSubmitHandler={(data) => {
            updateService({ data, serviceId });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default ServiceRow;
