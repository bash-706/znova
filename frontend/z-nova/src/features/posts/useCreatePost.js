import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost as postApi } from '../../services/apiPosts';
import { toast } from 'react-hot-toast';

export function useCreatePost() {
  const queryClient = useQueryClient();
  const {
    mutate: createPost,
    isLoading: isCreating,
    status,
  } = useMutation({
    mutationFn: async (data) => {
      return await postApi(data);
    },
    onSuccess: () => {
      toast.success('Post has been created successfully!', { duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createPost, isCreating, status };
}
