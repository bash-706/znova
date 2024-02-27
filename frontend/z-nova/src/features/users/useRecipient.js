import { useQuery } from '@tanstack/react-query';
import { getUser as recipientApi } from '../../services/apiUsers';

export function useRecipient(user, chat) {
  const userId = chat?.members?.find((id) => id !== user?._id);
  const {
    isLoading,
    data: recipient,
    error,
  } = useQuery({
    queryKey: ['recipient', userId],
    queryFn: async () => {
      return await recipientApi(userId);
    },
    retry: false,
  });
  return { recipient, isLoading, error };
}
