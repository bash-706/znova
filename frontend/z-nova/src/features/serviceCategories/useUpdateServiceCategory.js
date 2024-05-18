import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateServiceCategory as updateServiceCategoryApi } from '../../services/apiServiceCategories';
import toast from 'react-hot-toast';

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateServiceCategory, isLoading } = useMutation({
    mutationFn: async ({ data, categoryId }) => {
      return await updateServiceCategoryApi(data, categoryId);
    },
    onSuccess: () => {
      toast.success('Service Category has been updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateServiceCategory, isLoading };
}
