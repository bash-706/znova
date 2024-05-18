import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../services/apiPosts';

export function usePost(slug) {
  const {
    isLoading,
    data: post,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => await getPost(slug),
    retry: true,
  });
  return { post, isLoading, isSuccess, error };
}
