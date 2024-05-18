import { useQuery } from '@tanstack/react-query';
import { getUserReviews } from '../../services/apiReviews';

export function useUserReviews(userId) {
  console.log(userId);
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['userReviews', userId],
    queryFn: async () => await getUserReviews(userId),
    retry: false,
  });

  return { reviews, isLoading, error };
}
