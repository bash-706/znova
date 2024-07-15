import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutSession as checkoutApi } from '../../services/apiOrders';

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { mutate: createCheckoutSession, status } = useMutation({
    mutationFn: async ({ serviceId, item }) => {
      const data = await checkoutApi({ serviceId, item });
      return data;
    },
    onSuccess: async (data) => {
      console.log('data', data);
      queryClient.setQueryData(['checkoutSession'], data);
      window.location.href = data.session.url;
    },
  });
  return { createCheckoutSession, status };
}
