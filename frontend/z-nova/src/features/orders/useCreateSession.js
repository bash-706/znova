import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutSession as checkoutApi } from '../../services/apiOrders';
import { PUBLISHABLE_KEY } from '../../utils/constants';

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { mutate: createCheckoutSession, status } = useMutation({
    mutationFn: async ({ serviceId, item }) => {
      const data = await checkoutApi({ serviceId, item });
      console.log(data);
      return data;
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(['checkoutSession'], data);
      const stripe = await loadStripe(PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });
    },
  });
  return { createCheckoutSession, status };
}
