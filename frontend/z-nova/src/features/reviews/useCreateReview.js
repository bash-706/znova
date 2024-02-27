import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview as reviewApi } from '../../services/apiReviews';
import { toast } from 'react-hot-toast';

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { mutate: createReview, isLoading } = useMutation({
    mutationFn: async ({ serviceId, rating, review }) => {
      await reviewApi(serviceId, rating, review);
    },
    onSuccess: () => {
      toast.success('Review has been posted successfully!', { duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createReview, isLoading };
}
