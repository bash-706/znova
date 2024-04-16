import { useQuery } from '@tanstack/react-query';
import { getAllOrders as orderApi } from '../../services/apiOrders';

export function useOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await orderApi(),
    retry: false,
  });

  return { orders, isLoading, error };
}
