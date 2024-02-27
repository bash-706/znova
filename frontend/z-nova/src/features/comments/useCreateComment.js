import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as commentApi } from '../../services/apiComments';
import { toast } from 'react-hot-toast';

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async (data) => {
      await commentApi(data);
    },
    onSuccess: () => {
      toast.success(
        'Comment has been posted successfully! You can see the comment once it is approved by the admin.',
        {
          duration: 2000,
        },
      );
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createComment, isLoading };
}
