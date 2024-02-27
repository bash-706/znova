import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useForgotPassword() {
  const { mutate: forgotPassword, status } = useMutation({
    mutationFn: async (email) => {
      return await forgotPasswordApi(email);
    },
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 5000 });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 3000 });
    },
  });
  return { forgotPassword, status };
}
