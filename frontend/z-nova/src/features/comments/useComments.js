import { useQuery } from '@tanstack/react-query';
import { getAllComments as commentApi } from '../../services/apiComments';

export function useComments() {
  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => await commentApi(),
    retry: false,
  });

  return { comments, isLoading, error };
}
