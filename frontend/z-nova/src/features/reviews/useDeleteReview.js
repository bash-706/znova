import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview as deleteReviewApi } from '../../services/apiReviews';
import { toast } from 'react-hot-toast';

export function useDeleteReview() {
  const queryClient = useQueryClient();

  const { mutate: deleteReview, isLoading } = useMutation({
    mutationFn: async (reviewId) => {
      return await deleteReviewApi(reviewId);
    },
    onSuccess: () => {
      toast.success('Review has been deleted successfully!', {
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteReview, isLoading };
}
