import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment-timezone';
import {
  HiPaperAirplane,
  HiXCircle,
  HiOutlineDocumentText,
  HiPaperClip,
} from 'react-icons/hi';

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
import countryToTimezone from '../utils/countryToTimezone';
import { useQueryClient } from '@tanstack/react-query';

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

const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  margin: 0.5rem 0;
`;

const FilePreview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  width: 184px;
  padding: 0.8rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.8rem;
  background-color: #f0f8ff;
  box-shadow: var(--shadow-sm);

  .file-icon {
    font-size: 5rem;
    color: var(--color-brand-500);
  }

  .file-name {
    font-size: 1.5rem;
    text-align: center;
    overflow: hidden;
    overflow-wrap: break-word;
    white-space: nowrap;
    margin: 0 1rem;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand-500);
`;

const getLocalTime = (country) => {
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
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const {
    socket,
    onlineUsers,
    notifications,
    markNotification,
    sendMessage,
    chats,
    isLoading,
    error,
  } = useSocket();
  const {
    messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useMessages(currentChat?._id);
  const { recipient } = useRecipient(user, currentChat);

  const markUnreadNotifications = useCallback(
    (chat) => {
      const filteredNotifications = notifications.filter(
        (notif) => notif.chat === chat._id,
      );
      filteredNotifications.forEach((notif) => {
        markNotification(notif._id);
      });
    },
    [notifications, markNotification],
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const localTime = getLocalTime(recipient?.country);
  const [text, setText] = useState('');
  const { createMessage } = useCreateMessage(user?._id);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (chats && state?.newChatId) {
      const newChat = chats.find((chat) => chat._id === state.newChatId);
      if (newChat) {
        setCurrentChat(newChat);
      }
    } else if (chats) {
      const sortedChats = [...chats].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );
      setCurrentChat(sortedChats.at(0));
    }
  }, [chats, state?.newChatId]);

  useEffect(() => {
    if (currentChat) {
      markUnreadNotifications(currentChat);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      }, 100);
    }
  }, [currentChat, markUnreadNotifications, queryClient]);

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
    if (!text && files.length === 0) return;
    const formData = new FormData();
    formData.append('chatId', currentChat?._id);
    formData.append('senderId', user?._id);
    formData.append('text', text);
    files.forEach((file) => formData.append('files', file));
    createMessage(formData);
    setText('');
    setFiles([]);
    sendMessage({
      text,
      recipientId: recipient?._id,
      chatId: currentChat?._id,
      senderId: user?._id,
      files,
    });
    inputRef.current.focus();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...selectedFiles].slice(0, 3);
    setFiles(updatedFiles);
    inputRef.current.focus();
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
        {chats.map((chat, index) => {
          return (
            <div key={index}>
              <UserChat
                chat={chat}
                user={user}
                onlineUsers={onlineUsers}
                setActiveChat={updateCurrentChat}
                activeChat={currentChat}
                notifications={notifications}
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
                  />
                  {onlineUsers?.some(
                    (onlineUser) => onlineUser?.userId === recipient?._id,
                  ) && <StyledDot />}
                </div>
                <span>{recipient?.username}</span>
              </span>
            </div>
            <span style={{ color: 'var(--color-grey-400)' }}>
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
              justifyContent: 'center',
              gap: '2rem',
              flexDirection: 'column',
              padding: '1rem 2rem',
            }}
          >
            {files.length > 0 && (
              <FilePreviewContainer>
                {files.map((file, index) => (
                  <FilePreview key={index}>
                    {file.type.startsWith('image/') ? (
                      <>
                        <img src={URL.createObjectURL(file)} alt={file.name} />
                        <RemoveButton onClick={() => handleRemoveFile(index)}>
                          <HiXCircle size={20} />
                        </RemoveButton>
                      </>
                    ) : (
                      <>
                        <HiOutlineDocumentText className="file-icon" />
                        <span className="file-name">{file.name}</span>
                        <RemoveButton onClick={() => handleRemoveFile(index)}>
                          <HiXCircle size={20} />
                        </RemoveButton>
                      </>
                    )}
                  </FilePreview>
                ))}
              </FilePreviewContainer>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Send a message..."
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '2rem',
                  border: '1px solid var(--color-grey-200)',
                  marginRight: '1rem',
                  fontSize: '1.6rem',
                  color: '#000',
                }}
              />
              <FileLabel htmlFor="file-upload">
                <HiPaperClip style={{ width: '3rem', height: '3rem' }} />
                <FileInput
                  id="file-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={handleFileChange}
                />
              </FileLabel>
              <button
                onClick={handleSendMessage}
                style={{
                  borderRadius: '50%',
                  background: 'var(--color-brand-500)',
                  padding: '0.8rem',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                }}
              >
                <HiPaperAirplane style={{ width: '2rem', height: '2rem' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </StyledChat>
  );
}

export default Chat;
