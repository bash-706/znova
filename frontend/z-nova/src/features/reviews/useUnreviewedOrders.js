import { useQuery } from '@tanstack/react-query';
import { getUnreviewedOrders } from '../../services/apiReviews';

export function useUnreviewedOrders(serviceId) {
  const {
    isLoading,
    data: unreviewedOrders,
    error,
  } = useQuery({
    queryKey: ['unreviewedOrders', serviceId],
    queryFn: async () => await getUnreviewedOrders(serviceId),
    retry: false,
  });

  return { unreviewedOrders, isLoading, error };
}
