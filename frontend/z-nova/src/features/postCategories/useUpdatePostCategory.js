import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostCategory as updatePostCategoryApi } from '../../services/apiPostCategories';
import toast from 'react-hot-toast';

export function useUpdatePostCategory() {
  const queryClient = useQueryClient();

  const { mutate: updatePostCategory, isLoading } = useMutation({
    mutationFn: async ({ data, categoryId }) => {
      return await updatePostCategoryApi(data, categoryId);
    },
    onSuccess: () => {
      toast.success('Post Category has been updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['postCategories'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updatePostCategory, isLoading };
}
