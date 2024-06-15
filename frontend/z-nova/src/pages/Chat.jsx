import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { HiMiniPaperAirplane } from 'react-icons/hi2';
import InputEmoji from 'react-input-emoji';

import { useChats } from '../features/chats/useChats';
import { useMessages } from '../features/messages/useMessages';
import { useRecipient } from '../features/users/useRecipient';
import { useUser } from '../features/authentication/useUser';
import { useCreateMessage } from '../features/messages/useCreateMessage';

import Spinner from '../ui/Spinner';
import UserChat from '../features/chats/UserChat';
import Heading from '../ui/Heading';
import NoChats from '../ui/NoChats';
import Messages from '../features/chats/Messages';
import { useSocket } from '../context/SocketContext';

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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-grey-200);
  margin: 1rem 0;
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
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const { socket, onlineUsers, notifications, sendMessage } = useSocket();
  const { chats, isLoading, error } = useChats(user?._id);
  const {
    messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useMessages(currentChat?._id);
  const { recipient } = useRecipient(user, currentChat);

  console.log('notifications', notifications);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const localTime = getLocalTime();
  const [text, setText] = useState('');
  const { createMessage } = useCreateMessage();

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (res) => {
      if (currentChat?._id !== res?.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket, currentChat]);

  const handleSendMessage = () => {
    if (!text) return;
    createMessage({
      chatId: currentChat?._id,
      senderId: user?._id,
      text,
    });
    setText('');
    sendMessage({
      text,
      recipientId: recipient?._id,
      chatId: currentChat?._id,
      senderId: user?._id,
    });
  };

  if (error) return <div>Chats not found!</div>;
  if (isLoading) return <Spinner />;
  if (chats.length < 1) {
    return <NoChats />;
  }
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
        <Heading as="h4" style={{ fontSize: '2rem', margin: '0.6rem' }}>
          All Conversations
          <Divider />
        </Heading>
        {chats?.map((chat, index) => {
          return (
            <div key={index}>
              <UserChat
                chat={chat}
                user={user}
                onlineUsers={onlineUsers}
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
                  {onlineUsers?.some((onlineUser) => {
                    return onlineUser?.userId === recipient?._id;
                  }) && <StyledDot />}
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

export default Chat;
