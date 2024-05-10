import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteComment } from './useDeleteComment';
import { HiPencil, HiSquare2Stack, HiTrash, HiXCircle } from 'react-icons/hi2';
import { FaCheckCircle } from 'react-icons/fa';
import { useCreateComment } from './useCreateComment';
import { useUpdateComment } from './useUpdateComment';
import { useToggleCommentCheck } from './useToggleCommentCheck';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import CommentForm from './CommentForm';
import Tooltip from '../../ui/Tooltip';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 00.4fr 1.4fr 1fr 3fr 1.2fr 1fr 1fr 0.3fr;
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
  min-width: 1rem;
  aspect-ratio: 3 / 2;
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

function CommentRow({ comment }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { deleteComment, isDeleting } = useDeleteComment();
  const { isCreating, createComment } = useCreateComment(
    'Comment has been duplicated successfully!',
  );
  const { isLoading: isUpdating, updateComment } = useUpdateComment();
  const { toggleCommentCheck } = useToggleCommentCheck();

  const {
    _id: commentId,
    user,
    text,
    post,
    parent,
    replyOnUser,
    check,
    createdAt,
  } = comment;

  function handleDuplicate() {
    createComment({
      user: user?._id,
      slug: post?.slug,
      check: false,
      text,
      parent,
      replyOnUser,
    });
  }

  function handleApprove() {
    toggleCommentCheck({ data: 'approve', commentId });
  }

  function handleDisapprove() {
    toggleCommentCheck({ data: 'disapprove', commentId });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/posts/${post?.image}`} />
        <div style={{ textAlign: 'start' }}>{post?.title}</div>
        <div>
          {user?.name} ({user?.username})
        </div>
        <div>{text}</div>
        {parent ? (
          <IDCellWrapper
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <IDCellText>{parent || 'No Parent'}</IDCellText>
            <Tooltip isVisible={showTooltip}>{parent}</Tooltip>
          </IDCellWrapper>
        ) : (
          <IDCellText>{parent || 'No Parent'}</IDCellText>
        )}
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
          <span
            style={{
              borderRadius: '5rem',
              fontSize: '1rem',
              padding: '0.5rem',
              backgroundColor: check ? '#35db35' : '#fc3d3d',
              color: '#fff',
            }}
          >
            {check ? 'Approved' : 'Not Approved'}
          </span>
        </div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={commentId} />
              <Menus.List id={commentId}>
                {!check ? (
                  <Menus.Button
                    icon={<FaCheckCircle />}
                    onClick={() => handleApprove()}
                  >
                    Approve
                  </Menus.Button>
                ) : (
                  <Menus.Button
                    icon={<HiXCircle />}
                    onClick={() => handleDisapprove()}
                  >
                    Disapprove
                  </Menus.Button>
                )}
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
      </TableRow>
      {showForm && (
        <CommentForm
          btnLabel="Update"
          initialText={text}
          formSubmitHandler={(data) => {
            updateComment({ data, commentId });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
          placeholder="Edit Comment Text"
          styles={{
            margin: '2rem',
            fontSize: '1.3rem',
            fontWeight: '500',
            width: '96%',
          }}
          right="3rem"
          bottom="4rem"
        />
      )}
    </>
  );
}

export default CommentRow;
