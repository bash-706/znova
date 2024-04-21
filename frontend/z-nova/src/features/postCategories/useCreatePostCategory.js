import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostCategory as createPostCategoryApi } from '../../services/apiPostCategories';
import { toast } from 'react-hot-toast';

export function useCreatePostCategory() {
  const queryClient = useQueryClient();
  const { mutate: createPostCategory, isLoading } = useMutation({
    mutationFn: async (data) => {
      await createPostCategoryApi(data);
    },
    onSuccess: () => {
      toast.success('Post Category has been created successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['postCategories'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createPostCategory, isLoading };
}
