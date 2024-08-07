import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as commentApi } from '../../services/apiComments';
import { toast } from 'react-hot-toast';

export function useCreateComment(message) {
  const queryClient = useQueryClient();
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async (data) => {
      await commentApi(data);
    },
    onSuccess: () => {
      toast.success(message, {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createComment, isLoading };
}
