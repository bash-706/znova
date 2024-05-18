import { useQuery } from '@tanstack/react-query';
import { getAllPostCategories as postCategoriesApi } from '../../services/apiPostCategories';

export function usePostCategories() {
  const {
    isLoading,
    data: postCategories,
    error,
  } = useQuery({
    queryKey: ['postCategories'],
    queryFn: async () => await postCategoriesApi(),
    retry: false,
  });

  return { postCategories, isLoading, error };
}
