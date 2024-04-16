import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMessage as messageApi } from '../../services/apiMessages';
import { toast } from 'react-hot-toast';

export function useCreateMessage(setNewMessage) {
  const queryClient = useQueryClient();
  const { mutate: createMessage, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await messageApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createMessage, isLoading };
}
