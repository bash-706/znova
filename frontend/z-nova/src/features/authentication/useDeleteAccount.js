import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteAccount as deleteAccountApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useDeleteAccount() {
  const navigate = useNavigate();

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationFn: async (password) => {
      await deleteAccountApi(password);
    },
    onSuccess: () => {
      toast.success('Your account has been successfully deleted!', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/auth/signup', { replace: true });
      }, 2000);
    },
    onError: (err) => {
      toast.error(err.message, { duration: 2000 });
    },
  });
  return { deleteAccount, isLoading };
}
