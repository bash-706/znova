import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
import { unreadNotifications } from '../utils/unreadNotifications';
import countryToTimezone from '../utils/countryToTimezone';

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

const getLocalTime = (country) => {
  console.log(country);
  if (!country) {
    console.error('Country name is not provided');
    return null;
  }

  const timezone = countryToTimezone[country];

  if (!timezone) {
    console.error('Unable to determine timezone for the country:', country);
    return null;
  }

  const localTime = moment.tz(timezone);
  const formattedTime = localTime.format('MMM D, YYYY, h:mm A');
  return formattedTime;
};

function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const { state } = useLocation();
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
  const allUnreadNotifications = unreadNotifications(notifications);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const localTime = getLocalTime(recipient?.country);
  const [text, setText] = useState('');
  const { createMessage } = useCreateMessage();

  useEffect(() => {
    if (chats && state?.newChatId) {
      const newChat = chats.find((chat) => chat._id === state.newChatId);
      if (newChat) {
        setCurrentChat(newChat);
      }
    } else {
      setCurrentChat(chats?.at(0));
    }
  }, [chats, state?.newChatId]);

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
                allUnreadNotifications={allUnreadNotifications}
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
              {onlineUsers?.some((onlineUser) => {
                return onlineUser?.userId === recipient?._id;
              })
                ? 'Online'
                : 'Offline'}{' '}
              | Local time: {localTime}
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
    </StyledChat>
  );
}

export default Chat;
