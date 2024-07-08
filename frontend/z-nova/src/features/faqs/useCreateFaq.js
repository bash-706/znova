import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFaq as faqApi } from '../../services/apiFaqs';
import toast from 'react-hot-toast';

export function useCreateFaq() {
  const queryClient = useQueryClient();
  const { mutate: createFaq, status } = useMutation({
    mutationFn: async (data) => {
      return await faqApi(data);
    },
    onSuccess: () => {
      toast.success('FAQ has been created successfully!', { duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
      console.log(err);
    },
  });
  return { createFaq, status };
}
