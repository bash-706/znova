import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder as deleteOrderApi } from '../../services/apiOrders';
import { toast } from 'react-hot-toast';

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { mutate: deleteOrder, isLoading } = useMutation({
    mutationFn: async (orderId) => {
      return await deleteOrderApi(orderId);
    },
    onSuccess: () => {
      toast.success('Order has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteOrder, isLoading };
}
