import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost as deletePostApi } from '../../services/apiPosts';
import { toast } from 'react-hot-toast';

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: async (postId) => {
      return await deletePostApi(postId);
    },
    onSuccess: () => {
      toast.success('Post has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deletePost, isDeleting };
}
