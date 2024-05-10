import { useQuery } from '@tanstack/react-query';
import { getAllReviews } from '../../services/apiReviews';

export function useAllReviews() {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => await getAllReviews(),
    retry: false,
  });

  return { reviews, isLoading, error };
}
