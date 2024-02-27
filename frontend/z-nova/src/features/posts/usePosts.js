import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../services/apiPosts';

export function usePosts(type) {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getAllPosts(type),
    retry: false,
  });

  return { posts, isLoading, error };
}
