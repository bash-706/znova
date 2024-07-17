import { useQuery } from '@tanstack/react-query';
import { getServiceById } from '../../services/apiServices';

export function useServiceById(serviceId) {
  const { data: service, status } = useQuery({
    queryKey: ['serviceById'],
    queryFn: async () => await getServiceById(serviceId),
    retry: false,
  });
  return { service, status };
}
