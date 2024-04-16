import styled from 'styled-components';
import { HiChatBubbleLeft, HiPencil, HiTrash } from 'react-icons/hi2';
import { useUser } from '../authentication/useUser';
import CommentForm from './CommentForm';

const StyledComment = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 0 1.2rem;
  background: #f2f4f5;
  padding: 2rem;
  border-radius: 1rem;
`;

function Comment({
  comment,
  replies,
  reply = false,
  affectedComment,
  setAffectedComment,
  addComment,
  updateComment,
  deleteComment,
  parentId = null,
}) {
  const { user } = useUser();
  const commentBelongsToUser = user?._id === comment?.user?._id;
  const isReplying =
    affectedComment &&
    affectedComment?.type === 'replying' &&
    affectedComment?._id === comment?._id;

  const isEditing =
    affectedComment &&
    affectedComment?.type === 'editing' &&
    affectedComment?._id === comment?._id;

  const repliedCommentId = parentId ? parentId : comment?._id;
  const repliedOnUserId = comment?.user?._id;
  return (
    <StyledComment>
      <img
        style={{
          width: '4.5rem',
          height: '4.5rem',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        src={`http://127.0.0.1:8000/users/${comment?.user?.photo}`}
        alt={comment?.user?.name}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <h4 style={{ fontWeight: '500' }}>{comment?.user?.name}</h4>
        <span
          style={{
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#000',
            opacity: '55%',
          }}
        >
          {new Date(comment?.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        {!isEditing && (
          <p
            style={{
              margin: '1.8rem 0 0.8rem',
              color: '#000',
              opacity: '55%',
              fontWeight: '500',
            }}
          >
            {comment?.text}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            initialText={comment?.text}
            formSubmitHandler={(data) => {
              updateComment(data, comment?._id);
            }}
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 2rem',
            margin: '1.4rem 0',
            color: '#000',
            opacity: '55%',
            fontWeight: '500',
            fontSize: '1.6rem',
          }}
        >
          {user && (
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: 'none',
                outline: 'none',
              }}
              onClick={() =>
                setAffectedComment({ type: 'replying', _id: comment._id })
              }
            >
              <HiChatBubbleLeft />
              <span>Reply</span>
            </button>
          )}

          {user && commentBelongsToUser && (
            <>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: 'none',
                  outline: 'none',
                }}
                onClick={() =>
                  setAffectedComment({ type: 'editing', _id: comment._id })
                }
              >
                <HiPencil />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteComment(comment?._id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <HiTrash />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel={'Reply'}
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, repliedOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies?.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={replies?._id}
                parentId={comment?._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                updateComment={updateComment}
                deleteComment={deleteComment}
                replies={[]}
                reply={true}
              />
            ))}
          </div>
        )}
      </div>
    </StyledComment>
  );
}

export default Comment;
