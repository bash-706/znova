import styled from 'styled-components';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { useCreateComment } from './useCreateComment';
import { useUpdateComment } from './useUpdateComment';
import { useDeleteComment } from './useDeleteComment';
import Comment from './Comment';

const StyledCommentContainer = styled.section`
  margin-top: 4rem;
`;

const StyledMainComments = styled.section`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CommentsContainer({ comments, slug }) {
  const { createComment, isLoading: isCreating } = useCreateComment();
  const { updateComment } = useUpdateComment();
  const { deleteComment } = useDeleteComment();
  const [affectedComment, setAffectedComment] = useState(null);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    createComment({
      text: value,
      slug,
      parent,
      replyOnUser,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (data, commentId) => {
    updateComment({ data, commentId });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    deleteComment(commentId);
    setAffectedComment(null);
  };

  return (
    <StyledCommentContainer>
      <CommentForm
        btnLabel="Submit"
        formSubmitHandler={(value) => addCommentHandler(value)}
        isLoading={isCreating}
      />
      <StyledMainComments>
        {comments?.map((comment) => (
          <Comment
            key={comment?._id}
            comment={comment}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            replies={comment?.replies}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
          />
        ))}
      </StyledMainComments>
    </StyledCommentContainer>
  );
}

export default CommentsContainer;
