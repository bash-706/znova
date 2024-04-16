import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCommentCheck as toggleCommentCheckApi } from '../../services/apiComments';
import toast from 'react-hot-toast';

export function useToggleCommentCheck() {
  const queryClient = useQueryClient();

  const { mutate: toggleCommentCheck, isLoading } = useMutation({
    mutationFn: async ({ data, commentId }) => {
      console.log(data, commentId);
      return await toggleCommentCheckApi(data, commentId);
    },
    onSuccess: (data) => {
      if (data?.data?.data?.check) {
        toast.success('Comment has been approved successfully!');
      } else {
        toast.error('Comment has been disapproved successfully!');
      }
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      // queryClient.setQueryData(['post']);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { toggleCommentCheck, isLoading };
}
