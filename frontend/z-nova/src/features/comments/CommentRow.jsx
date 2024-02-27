import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteComment } from './useDeleteComment';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateComment } from './useCreateComment';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.4fr 1fr 3fr 1fr 1fr 0.3fr;
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

function CommentRow({ comment }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteComment, isDeleting } = useDeleteComment();
  const { isCreating, createComment } = useCreateComment();

  const { _id: commentId, user, text, post, parent, createdAt } = comment;

  function handleDuplicate() {
    // createPost({
    //   title: `Copy of ${title}`,
    //   categories,
    //   tags,
    //   image,
    //   body,
    //   caption,
    //   user,
    //   slug,
    //   createdAt,
    // });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={'/123.jpg'} />
        <div style={{ textAlign: 'start' }}>Post 1</div>
        <div>Ahsan Nadeem</div>
        <div>{text}</div>
        <div>Unknown User</div>
        {/* <div> */}
        {/* {post?.categories?.length > 0 ? post?.categories : 'Uncategorized'} */}
        {/* </div> */}
        {/* <div> */}
        {/* {post?.tags.length > 0 ? ( */}
        {/* post?.tags.map((tag, index) => */}
        {/* tags[tags.length - 1] !== tag ? `${tag}, ` : `${tag}`, */}
        {/* ) */}
        {/* ) : ( */}
        {/* <span>&mdash;</span> */}
        {/* )} */}
        {/* </div> */}
        <div>
          {new Date(comment?.createdAt).toLocaleDateString('en-US', {
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
              <Menus.Toggle id={commentId} />
              <Menus.List id={commentId}>
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
                onConfirm={() => deleteComment(commentId)}
                resourceName={`comment`}
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

export default CommentRow;
