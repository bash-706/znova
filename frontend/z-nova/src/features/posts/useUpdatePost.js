import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost as updatePostApi } from '../../services/apiPosts';
import { toast } from 'react-hot-toast';

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: updatePost, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ formData: data, postId }) => {
      return await updatePostApi(data, postId);
    },
    onSuccess: () => {
      toast.success('Post has been updated successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
      console.log(err);
    },
  });
  return { updatePost, isUpdating };
}
