import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async ({ data, userId, message }) => {
      return await updateUserApi(data, userId, message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // queryClient.setQueryData(['post']);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { updateUser, isLoading };
}
