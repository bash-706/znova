import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServiceCategory as createServiceCategoryApi } from '../../services/apiServiceCategories';
import { toast } from 'react-hot-toast';

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();
  const { mutate: createServiceCategory, isLoading } = useMutation({
    mutationFn: async (data) => {
      await createServiceCategoryApi(data);
    },
    onSuccess: () => {
      toast.success('Service Category has been created successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createServiceCategory, isLoading };
}
