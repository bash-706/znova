import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createService as serviceApi } from '../../services/apiServices';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateService() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createService,
    isLoading: isCreating,
    status,
  } = useMutation({
    mutationFn: async (data) => {
      return await serviceApi(data);
    },
    onSuccess: (data) => {
      navigate(`/admin/services/${data.data.data._id}/faqs`);
      toast.success('Service has been created successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createService, isCreating, status };
}
