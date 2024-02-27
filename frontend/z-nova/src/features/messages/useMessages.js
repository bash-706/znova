import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../../services/apiMessages';

export function useMessages(chatId) {
  const {
    isLoading,
    data: messages,
    error,
  } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => await getAllMessages(chatId),
    retry: false,
  });
  return { messages, isLoading, error };
}
