import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteReview } from './useDeleteReview';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useUpdateReview } from './useUpdateReview';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Tooltip from '../../ui/Tooltip';
import AdminReviewForm from './AdminReviewForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2.2fr 1.4fr 2.6fr 0.5fr 1.4fr 1fr 0.6fr;
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

function ReviewRow({ review }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { deleteReview, isLoading: isDeleting } = useDeleteReview();
  const { isLoading: isUpdating, updateReview } = useUpdateReview();
  const {
    _id: reviewId,
    review: reviewText,
    rating,
    user,
    service,
    createdAt,
  } = review;

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/services/${service?.imageCover}`} />
        <div>{service?.name}</div>
        <div>{user?.name} (bash706_)</div>
        <div>{reviewText}</div>
        <div>⭐ {rating}</div>
        <div>
          {new Date(createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
          })}
        </div>
        <IDCellWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <IDCellText>{reviewId}</IDCellText>
          <Tooltip isVisible={showTooltip}>{reviewId}</Tooltip>
        </IDCellWrapper>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={reviewId} />
              <Menus.List id={reviewId}>
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
                onConfirm={() => deleteReview(reviewId)}
                resourceName={`review`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <AdminReviewForm
          btnLabel="Update"
          user={user}
          formSubmitHandler={(data) => {
            updateReview({ data, reviewId });
            setShowForm(false);
          }}
          initialText={reviewText}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default ReviewRow;
