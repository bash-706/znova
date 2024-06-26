import { useForm } from 'react-hook-form';
import TextArea from '../../ui/TextArea';
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
`;

function CommentForm({
  btnLabel,
  initialText = '',
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
  placeholder = 'Leave your comments here...',
  right = '1.6rem',
  bottom = '2.6rem',
  styles,
}) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit({ comment }) {
    formSubmitHandler(comment);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <TextArea
          id="comment"
          //   disabled={isLoading}
          {...register('comment', { required: 'This field is required' })}
          rows="5"
          style={{
            padding: '2rem',
            resize: 'none',
            borderRadius: '1rem',
            disabled: { isLoading },
            ...styles,
            // background: 'transparent',
          }}
          placeholder={placeholder}
        >
          {initialText}
        </TextArea>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            position: 'absolute',
            right,
            bottom,
          }}
        >
          {formCancelHandler && (
            <StyledButton
              onClick={formCancelHandler}
              style={{ background: 'var(--color-grey-200)' }}
            >
              Cancel
            </StyledButton>
          )}

          <StyledButton
            style={{ background: 'var(--color-brand-600)', color: '#fff' }}
          >
            {btnLabel}
          </StyledButton>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
