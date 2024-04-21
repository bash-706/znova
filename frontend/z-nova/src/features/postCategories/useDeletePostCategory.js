import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostCategory as deletePostCategoryApi } from '../../services/apiPostCategories';
import { toast } from 'react-hot-toast';

export function useDeletePostCategory() {
  const queryClient = useQueryClient();

  const { mutate: deletePostCategory, isLoading } = useMutation({
    mutationFn: async (categoryId) => {
      return await deletePostCategoryApi(categoryId);
    },
    onSuccess: () => {
      toast.success('Post Category has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['postCategories'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deletePostCategory, isLoading };
}
