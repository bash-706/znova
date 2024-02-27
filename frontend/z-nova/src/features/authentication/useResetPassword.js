import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useResetPassword() {
  const { mutate: resetPassword, status } = useMutation({
    mutationFn: async ({ resetToken, password, passwordConfirm }) => {
      return await resetPasswordApi({ resetToken, password, passwordConfirm });
    },
    onSuccess: () => {
      toast.success('Your password has been reset sucessfully.', {
        duration: 5000,
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 3000 });
    },
  });
  return { resetPassword, status };
}
