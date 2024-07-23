// SocketContext.js
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../features/authentication/useUser';
import { useChats } from '../features/chats/useChats';
import { useUserNotifications } from '../features/notifications/useUserNotifications';
import { useMarkNotificationAsRead } from '../features/notifications/useMarkNotificationAsRead';
import { useQueryClient } from '@tanstack/react-query';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { userNotifications } = useUserNotifications();
  const { markNotification } = useMarkNotificationAsRead();
  const { user } = useUser();
  const { chats, isLoading, error } = useChats(user?._id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    if (user) {
      socket.emit('addNewUser', user?._id);
      socket.on('getOnlineUsers', (res) => {
        setOnlineUsers(res);
      });
      return () => {
        socket.off('getOnlineUsers');
      };
    }
  }, [socket, user]);

  useEffect(() => {
    if (userNotifications) {
      setNotifications(userNotifications?.notifications);
    }
  }, [userNotifications]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('getNotification', (res) => {
      setNotifications((prev) => [...prev, res]);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['chats', user?._id] });
        queryClient.invalidateQueries({ queryKey: ['chats'] });
      }, 100);
    });

    return () => {
      socket.off('getNotification');
    };
  }, [socket, queryClient, user?._id]);

  const sendMessage = useCallback(
    (messageData) => {
      if (socket === null) return;
      socket.emit('sendMessage', messageData);
    },
    [socket],
  );

  const markNotificationAsRead = useCallback(
    (notificationId) => {
      markNotification(notificationId);
      setNotifications((prev) =>
        prev.filter((notif) => notif._id !== notificationId),
      );
    },
    [markNotification],
  );
  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        notifications,
        sendMessage,
        markNotification: markNotificationAsRead,
        chats,
        isLoading,
        error,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
