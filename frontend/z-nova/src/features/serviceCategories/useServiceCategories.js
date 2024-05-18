import { useQuery } from '@tanstack/react-query';
import { getAllServiceCategories as serviceCategoriesApi } from '../../services/apiServiceCategories';

export function useServiceCategories() {
  const {
    isLoading,
    data: serviceCategories,
    error,
  } = useQuery({
    queryKey: ['serviceCategories'],
    queryFn: async () => await serviceCategoriesApi(),
    retry: false,
  });

  return { serviceCategories, isLoading, error };
}
