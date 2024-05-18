import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../../services/apiOrders';

export function useUserOrders(userId) {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ['userOrders', userId],
    queryFn: async () => await getUserOrders(userId),
    retry: false,
  });

  return { orders, isLoading, error };
}
