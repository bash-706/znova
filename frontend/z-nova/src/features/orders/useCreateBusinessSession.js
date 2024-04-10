import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutBusinessSession as checkoutBusinessApi } from '../../services/apiOrders';
import { PUBLISHABLE_KEY } from '../../utils/constants';

export default function useCreateBusinessSession() {
  const queryClient = useQueryClient();
  const { mutate: createBusinessSession, status } = useMutation({
    mutationFn: async (plan) => {
      const data = await checkoutBusinessApi(plan);
      return data;
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(['checkoutBusinessSession'], data);
      const stripe = await loadStripe(PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });
    },
  });
  return { createBusinessSession, status };
}
