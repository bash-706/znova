import { useMutation } from '@tanstack/react-query';
import { activateAccount as activateApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useActivate({ onSuccess, onError }) {
  const navigate = useNavigate();

  const { mutate: activateAccount, isLoading } = useMutation({
    mutationFn: async (token) => {
      await activateApi(token);
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Account Activated Successfully!', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 2000);
    },
    onError: (error) => {
      onError();
      toast.error(error?.message || 'Account Activation Failed.', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 2000);
    },
  });

  return { activateAccount, isLoading };
}
