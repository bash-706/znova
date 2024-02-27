import { useQuery } from '@tanstack/react-query';
import { getAllReviews } from '../../services/apiReviews';

export function useReviews(serviceId) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['reviews', serviceId],
    queryFn: async () => await getAllReviews(serviceId),
    retry: false,
  });

  return { reviews, isLoading, error };
}
