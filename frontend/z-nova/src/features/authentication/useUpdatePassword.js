import { useMutation } from '@tanstack/react-query';
// import { toast } from "react-hot-toast";
import { updateAccount } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  // const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ currentPassword, password, passwordConfirm }) => {
      await updateAccount(
        { currentPassword, password, passwordConfirm },
        'password',
      );
    },
    onSuccess: () => {
      toast.success('Password updated successfully!');
      // queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePassword, isUpdating };
}
