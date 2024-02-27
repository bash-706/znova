import styled from 'styled-components';
import { useRecipient } from '../users/useRecipient';
import moment from 'moment';
import { useMessages } from '../messages/useMessages';

const StyledUserChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-grey-50);
  padding: 1rem 2rem;
  cursor: pointer;
  transition: 0.4s ease;
  /* border-bottom: 1px solid var(--color-grey-200); */
`;

const StyledOnline = styled.div`
  display: flex;
  background: var(--color-brand-500);
  color: var(--color-grey-50);
  height: 1.8rem;
  width: 1.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const TimeAgo = ({ createdAt, style }) => {
  const timeAgo = moment(createdAt).fromNow();

  return <span style={style}>{timeAgo}</span>;
};

function UserChat({ chat, user, setActiveChat, activeChat }) {
  const { recipient } = useRecipient(user, chat);
  const { messages } = useMessages(chat?._id);
  return (
    <StyledUserChat
      onClick={() => {
        setActiveChat(chat);
      }}
      style={{
        background:
          activeChat?._id === chat._id
            ? 'var(--color-grey-200)'
            : 'var(--color-grey-50)',
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <img
          style={{ width: '5rem', height: '5rem', borderRadius: '50%' }}
          src={`http://127.0.0.1:8000/users/${recipient?.photo}`}
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
        >
          <span style={{ fontSize: '1.4rem', fontWeight: '500' }}>
            {recipient?.name}
          </span>
          <span style={{ fontSize: '1.2rem', color: 'var(--color-grey-500)' }}>
            {messages?.length >= 1
              ? messages?.at(messages?.length - 1)?.text
              : 'Please start new conversation'}
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <StyledOnline>2</StyledOnline>
        <span>
          <TimeAgo
            style={{ fontSize: '1.2rem' }}
            createdAt={chat?.createdAt}
          ></TimeAgo>
        </span>
      </div>
    </StyledUserChat>
  );
}

export default UserChat;
