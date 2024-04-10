import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteService as deleteServiceApi } from '../../services/apiServices';
import { toast } from 'react-hot-toast';

export function useDeleteService() {
  const queryClient = useQueryClient();

  const { mutate: deleteService, isLoading: isDeleting } = useMutation({
    mutationFn: async (serviceId) => {
      return await deleteServiceApi(serviceId);
    },
    onSuccess: () => {
      toast.success('Service has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteService, isDeleting };
}
