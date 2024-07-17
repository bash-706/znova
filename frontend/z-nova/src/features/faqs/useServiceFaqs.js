import { useQuery } from '@tanstack/react-query';
import { getServiceFaqs as serviceFaqsApi } from '../../services/apiFaqs';

export function useServiceFaqs(serviceId) {
  const {
    isLoading,
    data: faqs,
    error,
  } = useQuery({
    queryKey: ['faqs', serviceId],
    queryFn: async () => await serviceFaqsApi(serviceId),
    retry: false,
  });
  return { faqs, isLoading, error };
}
