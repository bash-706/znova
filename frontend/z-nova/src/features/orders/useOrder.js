import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../../services/apiOrders';

export function useOrder(orderId) {
  const {
    isLoading,
    data: order,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => await getOrder(orderId),
    retry: false,
  });
  return { order, isLoading, isSuccess, error };
}
