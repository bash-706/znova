import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFaq as updateFaqApi } from '../../services/apiFaqs';
import toast from 'react-hot-toast';

export function useUpdateFaq() {
  const queryClient = useQueryClient();

  const { mutate: updateFaq, status } = useMutation({
    mutationFn: async ({ data, faqId }) => {
      return await updateFaqApi({ data, faqId });
    },
    onSuccess: () => {
      toast.success('FAQ has been updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateFaq, status };
}
