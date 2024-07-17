import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFaq as deleteFaqApi } from '../../services/apiFaqs';
import { toast } from 'react-hot-toast';

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  const { mutate: deleteFaq, status } = useMutation({
    mutationFn: async (faqId) => {
      return await deleteFaqApi(faqId);
    },
    onSuccess: () => {
      toast.success('FAQ has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteFaq, status };
}
