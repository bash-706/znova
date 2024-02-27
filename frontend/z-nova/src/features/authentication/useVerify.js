import { useMutation } from '@tanstack/react-query';
import { verifyAccount as verifyApi } from '../../services/apiAuth';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useVerify() {
  // const navigate = useNavigate();

  const { mutate: verifyAccount, isLoading } = useMutation({
    mutationFn: async (token) => {
      await verifyApi(token);
    },
    onSuccess: () => {
      // navigate('/home');
      toast.success('Account Verified Successfully!');
    },
    onError: () => {
      // navigate('/auth/login');
      toast.error('Account Verification Failed.');
    },
  });
  return { verifyAccount, isLoading };
}
