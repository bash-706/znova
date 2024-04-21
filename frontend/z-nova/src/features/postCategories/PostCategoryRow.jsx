import styled from 'styled-components';
import { useState } from 'react';
import { useDeletePostCategory } from './useDeletePostCategory';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreatePostCategory } from './useCreatePostCategory';
import { useUpdatePostCategory } from './useUpdatePostCategory';
import PostCategoryEditForm from './PostCategoryEditForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 0.3fr;
  column-gap: 2.4rem;
  align-items: center;
  /* text-align: center; */
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// const Img = styled.img`
//   display: block;
//   min-width: 1rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
//   margin: 0 1.2rem;
// `;

function PostCategoryRow({ postCategory }) {
  const [showForm, setShowForm] = useState(false);
  const { deletePostCategory, isLoading: isDeleting } = useDeletePostCategory();
  const { createPostCategory, isLoading: isCreating } = useCreatePostCategory();
  const { updatePostCategory, isLoading: isUpdating } = useUpdatePostCategory();

  const { _id: categoryId, createdAt, name } = postCategory;

  function handleDuplicate() {
    createPostCategory({
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
            {/* <button onClick={() => setShowForm((show) => !show)}>Edit</button> */}
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
                onConfirm={() => deletePostCategory(categoryId)}
                resourceName={`category`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <PostCategoryEditForm
          btnLabel="Update"
          initialText={name}
          formSubmitHandler={(data) => {
            updatePostCategory({ data, categoryId });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default PostCategoryRow;
