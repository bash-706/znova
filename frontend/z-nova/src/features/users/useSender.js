import { useQuery } from '@tanstack/react-query';
import { getUser as senderApi } from '../../services/apiUsers';

export function useSender(userId) {
  const {
    isLoading,
    data: sender,
    error,
  } = useQuery({
    queryKey: ['sender', userId],
    queryFn: async () => await senderApi(userId),
    // retry: false,
  });
  return { sender, isLoading, error };
}
