import { useQuery } from '@tanstack/react-query';
import { getService } from '../../services/apiServices';

export function useService(slug) {
  const {
    isLoading,
    data: service,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['service'],
    queryFn: async () => await getService(slug),
    retry: false,
  });
  return { service, isLoading, error, isSuccess };
}
