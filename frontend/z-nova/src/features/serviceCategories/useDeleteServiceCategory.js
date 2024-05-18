import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteServiceCategory as deleteServiceCategoryApi } from '../../services/apiServiceCategories';
import { toast } from 'react-hot-toast';

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteServiceCategory, isLoading } = useMutation({
    mutationFn: async (categoryId) => {
      return await deleteServiceCategoryApi(categoryId);
    },
    onSuccess: () => {
      toast.success('Service Category has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteServiceCategory, isLoading };
}
