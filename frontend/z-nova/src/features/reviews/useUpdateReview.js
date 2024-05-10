import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReview as updateReviewApi } from '../../services/apiReviews';
import toast from 'react-hot-toast';

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: async ({ data, reviewId }) => {
      return await updateReviewApi(data, reviewId);
    },
    onSuccess: () => {
      toast.success('Review has been updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateReview, isLoading };
}
