import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutBusinessSession as checkoutBusinessApi } from '../../services/apiOrders';

export default function useCreateBusinessSession() {
  const queryClient = useQueryClient();
  const { mutate: createBusinessSession, status } = useMutation({
    mutationFn: async (plan) => {
      const data = await checkoutBusinessApi(plan);
      return data;
    },
    onSuccess: async (data) => {
      console.log(data, 'data');
      queryClient.setQueryData(['checkoutBusinessSession'], data);
      window.location.href = data.session.url;
    },
  });
  return { createBusinessSession, status };
}
