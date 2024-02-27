import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '../../services/apiChats';

export function useChats(userId) {
  const {
    isLoading,
    data: chats,
    error,
  } = useQuery({
    queryKey: ['chats', userId],
    queryFn: async () => await getAllChats(userId),
    retry: false,
  });

  return { chats, isLoading, error };
}
