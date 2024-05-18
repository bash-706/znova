import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteServiceCategory } from './useDeleteServiceCategory';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateServiceCategory } from './useCreateServiceCategory';
import { useUpdateServiceCategory } from './useUpdateServiceCategory';
import ServiceCategoryEditForm from './ServiceCategoryEditForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 0.3fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function ServiceCategoryRow({ serviceCategory }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteServiceCategory, isLoading: isDeleting } =
    useDeleteServiceCategory();
  const { createServiceCategory, isLoading: isCreating } =
    useCreateServiceCategory();
  const { updateServiceCategory, isLoading: isUpdating } =
    useUpdateServiceCategory();

  const { _id: categoryId, createdAt, name } = serviceCategory;

  function handleDuplicate() {
    createServiceCategory({
      name: `Copy of ${name}`,
    });
  }

  return (
    <>
      <TableRow role="row">
        <div>{name}</div>
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
            <Menus.Menu>
              <Menus.Toggle id={categoryId} />
              <Menus.List id={categoryId}>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Edit
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
                onConfirm={() => deleteServiceCategory(categoryId)}
                resourceName={`category`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <ServiceCategoryEditForm
          btnLabel="Update"
          initialText={name}
          formSubmitHandler={(data) => {
            updateServiceCategory({ data, categoryId });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default ServiceCategoryRow;
