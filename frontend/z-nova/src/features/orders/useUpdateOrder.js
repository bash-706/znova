import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder as updateOrderApi } from '../../services/apiOrders';
import toast from 'react-hot-toast';

export default function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutate: updateOrder, isLoading } = useMutation({
    mutationFn: async ({ data, orderId }) => {
      return await updateOrderApi(data, orderId);
    },
    onSuccess: () => {
      toast.success('Order has been updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateOrder, isLoading };
}
