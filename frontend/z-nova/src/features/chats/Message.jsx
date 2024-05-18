import styled from 'styled-components';
import { useSender } from '../users/useSender';
import moment from 'moment-timezone';

const StyledMessage = styled.span`
  padding: 1rem 2rem;
  border-radius: 6rem;
  display: inline-block;
  color: #fff;
  width: fit-content;
`;

const StyledUser = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
`;

function Message({ message, user }) {
  const { sender } = useSender(message?.senderId);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <StyledUser src={`http://127.0.0.1:8000/users/${sender?.photo}`} />
        <span style={{ fontWeight: '500' }}>{sender?.name.split(' ')[0]}</span>
        <span style={{ fontSize: '1.4rem' }}>
          {moment(message?.createdAt)?.calendar()}
        </span>
      </div>
      <StyledMessage
        style={{
          background:
            message?.senderId === user?._id ? 'var(--color-brand-600)' : 'red',
        }}
      >
        {message?.text}
      </StyledMessage>
    </>
  );
}

export default Message;
