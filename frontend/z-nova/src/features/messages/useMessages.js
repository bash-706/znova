import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../../services/apiMessages';

export function useMessages(chatId) {
  const {
    isLoading,
    data: messagesData,
    error,
  } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => await getAllMessages(chatId),
    retry: false,
  });
  return { messagesData, isLoading, error };
}
