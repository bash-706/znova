import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: async ({ email_username, password }) => {
      await loginApi(email_username, password);
    },
    onSuccess: () => {
      toast.success('Logged in successfully!', { duration: 2000 });
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { login, status };
}
