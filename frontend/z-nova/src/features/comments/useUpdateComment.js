import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment as updateCommentApi } from '../../services/apiComments';
import toast from 'react-hot-toast';

export function useUpdateComment() {
  const queryClient = useQueryClient();

  const { mutate: updateComment, isLoading } = useMutation({
    mutationFn: async ({ data, commentId }) => {
      return await updateCommentApi(data, commentId);
    },
    onSuccess: () => {
      toast.success(
        'Comment has been edited successfully! You can see the comment once it is approved by the admin.',
      );
      queryClient.invalidateQueries({ queryKey: ['post'] });
      // queryClient.setQueryData(['post']);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateComment, isLoading };
}
