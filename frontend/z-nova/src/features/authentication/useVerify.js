import { useMutation } from '@tanstack/react-query';
import { verifyAccount as verifyApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useVerify({ onSuccess, onError }) {
  const navigate = useNavigate();

  const { mutate: verifyAccount, isLoading } = useMutation({
    mutationFn: async (token) => {
      await verifyApi(token);
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Account Verified Successfully!', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 2000);
    },
    onError: (error) => {
      onError();
      toast.error(error?.message || 'Account Verification Failed.', {
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 2000);
    },
  });

  return { verifyAccount, isLoading };
}
