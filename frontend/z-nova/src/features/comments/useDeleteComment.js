import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment as deleteCommentApi } from '../../services/apiComments';
import { toast } from 'react-hot-toast';

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: async (commentId) => {
      return await deleteCommentApi(commentId);
    },
    onSuccess: () => {
      toast.success('Comment has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteComment, isLoading };
}
