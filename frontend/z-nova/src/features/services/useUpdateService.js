import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateService as updateServiceApi } from '../../services/apiServices';
import { toast } from 'react-hot-toast';

export function useUpdateService() {
  const queryClient = useQueryClient();

  const { mutate: updateService, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ data, serviceId }) => {
      return await updateServiceApi(data, serviceId);
    },
    onSuccess: () => {
      toast.success('Service has been updated successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
      console.log(err);
    },
  });
  return { updateService, isUpdating };
}
