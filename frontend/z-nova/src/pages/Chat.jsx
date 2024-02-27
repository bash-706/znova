import { useChats } from '../features/chats/useChats';
import { useMessages } from '../features/messages/useMessages';
import { useSender } from '../features/users/useSender';
import { useRecipient } from '../features/users/useRecipient';
import { useUser } from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from '../ui/Spinner';
import UserChat from '../features/chats/UserChat';
import Heading from '../ui/Heading';
import { useCallback, useState } from 'react';
import moment from 'moment-timezone';
import InputEmoji from 'react-input-emoji';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import { useCreateMessage } from '../features/messages/useCreateMessage';

const StyledChat = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: calc(100vh - 6rem);
  padding: 3rem;
  width: 100%;
  gap: 2rem;
`;

const CenteredBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledUser = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
`;

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 4rem;
`;
const StyledMessage = styled.span`
  padding: 1rem 2rem;
  border-radius: 6rem;
  display: inline-block;
  color: #fff;
  width: fit-content;
`;

const StyledDot = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 1rem;
  height: 1rem;
  background-color: #00da00;
  border-radius: 50%;
  border: 1px solid white;
`;

const getLocalTime = () => {
  // Get the timezone for the specified country
  const userTimezone = moment.tz.guess();

  if (!userTimezone) {
    console.error('Unable to determine timezone for the country.');
    return null;
  }

  // Get the current date and time in the specified time zone
  const localTime = moment.tz(userTimezone);

  // Format the date and time
  const formattedTime = localTime.format('MMM D, YYYY, h:mm A');

  return formattedTime;
};

function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useUser();
  const { chats, isLoading, error } = useChats(user?._id);
  const {
    messages,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useMessages(currentChat?._id);
  const { recipient } = useRecipient(user, currentChat);
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  const localTime = getLocalTime();

  const [text, setText] = useState('');

  const { createMessage } = useCreateMessage();

  const handleSendMessage = () => {
    if (!text) return;
    createMessage({ chatId: currentChat?._id, senderId: user?._id, text });
    setText('');
  };

  if (error) return <div>Chats not found!</div>;
  if (isLoading) return <Spinner />;
  return (
    <StyledChat>
      <div
        style={{
          overflow: 'auto',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-grey-200)',
          borderRadius: '2rem',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}
      >
        <Heading as="h4" style={{ fontSize: '2rem' }}>
          All Messages
        </Heading>
        {chats?.map((chat, index) => {
          return (
            <div key={index}>
              <UserChat
                chat={chat}
                user={user}
                setActiveChat={updateCurrentChat}
                activeChat={currentChat}
              />
            </div>
          );
        })}
      </div>
      {currentChat && (
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1.2fr 8fr 2fr',
            overflow: 'auto',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-grey-200)',
            borderRadius: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid var(--color-grey-200)',
              padding: '1rem 4rem',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <StyledUser
                    src={`http://127.0.0.1:8000/users/${recipient?.photo}`}
                  ></StyledUser>
                  <StyledDot />
                </div>
                <span>{recipient?.name}</span>
              </span>
              <span style={{ color: 'var(--color-grey-500)' }}>
                {recipient?.username}
              </span>
            </div>
            <span style={{ fontSize: '1.4rem' }}>
              Online | Local time: {localTime}
            </span>
          </div>

          <div
            style={{
              borderBottom: '1px solid var(--color-grey-200)',
              overflow: 'auto',
            }}
          >
            {isLoadingMessages && (
              <CenteredBox>
                <Spinner />
              </CenteredBox>
            )}
            {messagesError && (
              <CenteredBox>
                <p>Something went wrong!</p>
              </CenteredBox>
            )}
            {messages?.length > 0 && (
              <Messages messages={messages} user={user} />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <InputEmoji
              value={text}
              onChange={setText}
              fontSize={'1.6rem'}
              placeholder="Send a message..."
            />
            <button
              onClick={handleSendMessage}
              style={{
                borderRadius: '50%',
                marginRight: '1rem',
                background: 'var(--color-brand-500)',
                padding: '0.8rem',
                border: 'none',
                outline: 'none',
                color: '#fff',
              }}
            >
              <HiMiniPaperAirplane style={{ width: '2rem', height: '2rem' }} />
            </button>
          </div>
        </div>
      )}
      {!currentChat && (
        <CenteredBox>
          <p>No Chats Available</p>
        </CenteredBox>
      )}
    </StyledChat>
  );
}

function Messages({ messages, user }) {
  return (
    <StyledMessages>
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
              // alignItems:
              // message?.senderId === user?._id ? 'flex-end' : 'flex-start',
            }}
          >
            <Message message={message} user={user} />
          </div>
        );
      })}
    </StyledMessages>
  );
}

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

export default Chat;
